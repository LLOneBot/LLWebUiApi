;"use strict";

// Grabed this from somewhere...
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  .replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, 
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

class IPCWebSocket {
  constructor() {
    this.url = `${(location.protocol === 'https:' ? 'wss:' : 'ws:')}//${location.host}/ipc`;
    this.ws = new WebSocket(this.url);

    this.echos = {
      invoke: [],
    };

    this.ws.addEventListener('open', () => this._onConnected());
    this.ws.addEventListener('close', () => this._onClosed());
    this.ws.addEventListener('message', (msgRaw) => {
      let msg;

      if (msgRaw.type !== 'message' || typeof msgRaw.data !== 'string') return;

      try {
        msg = JSON.parse(msgRaw.data);
        this._onMessage(msg);
      } catch (e) {
        console.log('Failed when processing server message');
        console.error(e);
      }
    });
  }

  _onConnected() {
    this.heartBeatClock = setInterval(() => this._sendPing(), 5000);
  }

  _onClosed() {
    if (this.heartBeatClock) clearInterval(this.heartBeatClock);
  }

  _onMessage(msg) {
    if (msg.type === 'pong') { /* Ping-pong */ }
    else if (msg.type === 'invoke') {
      this._doMsgEchoCallback('invoke', msg.channel, msg.echo, msg.data);
    }
  }

  _send(data) {
    return this.ws.send(JSON.stringify(data));
  }

  _sendPing() {
    return this._send({
      type: 'ping',
      channel: 'WebApiInternal',
      echo: `ipc_ping_${performance.now()}`,
    });
  }

  _doMsgEchoCallback(type, channel, echoStr, data) {
    const echos = this.echos[type];

    if (!echos) throw new Error(`No such echo type: ${type}`);

    for (const echo of echos) {
      if (echo.channel !== channel) continue;
      if (echoStr && echo.echo !== echoStr) continue;

      if (data instanceof Array && data.length === 1) echo.callback(data[0]);
      else echo.callback(data);
    }
  }

  addMsgEcho(type, channel, callback, echo = null) {
    const echos = this.echos[type];
    const id = uuidv4();

    if (!echos) throw new Error(`No such echo type: ${type}`);

    echos.push({ id, channel, callback, echo });
    return id;
  }

  removeMsgEcho(type, id) {
    const echos = this.echos[type];

    if (!echos) throw new Error(`No such echo type: ${type}`);

    for (let i = 0; i < echos.length; i++) {
      if (echos[i].id !== id) continue;
      echos.splice(i, 1);
      return true;
    }
    return false;
  }

  invoke(channel, ...params) {
    const echo = `ipc_invoke_${performance.now()}`;
    return new Promise((res, rej) => {
      const echoId = this.addMsgEcho('invoke', channel, (data) => {
        res(data);
        this.removeMsgEcho('invoke', echoId);
      }, echo);

      try {
        this._send({
          type: 'invoke',
          channel,
          params: [ ...params ],
          echo,
        });
      } catch (e) {
        rej(e);
      }
    });
  }

  send(channel, ...params) {
    const echo = `ipc_send_${performance.now()}`;
    return new Promise((res, rej) => {
      try {
        res(this._send({
          type: 'send',
          channel,
          params: [ ...params ],
          echo,
        }));
      } catch (e) {
        rej(e);
      }
    });
  }
}
