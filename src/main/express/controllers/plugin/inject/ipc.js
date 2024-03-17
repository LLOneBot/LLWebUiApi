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
      on: [],
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

  _onMessage({ type, channel, echo, data, error }) {
    switch (type) {
      case 'invoke':
      case 'event':
        this._doMsgEchoCallback(type, channel, echo, data, error);
        break;
      default: {
        /* Nobody here but us chickens */
      }
    }
  }

  _send(data) {
    return this.ws.send(JSON.stringify(data));
  }

  _echo(type) {
    return `ipc_${type}_${performance.now()}`;
  }

  _sendPing() {
    return this._send({
      type: 'ping',
      channel: 'WebApiInternal',
      echo: this._echo('ping'),
    });
  }

  _doMsgEchoCallback(type, channel, echoStr, data, error) {
    const echos = this.echos[type];

    if (!echos) throw new Error(`No such echo type: ${type}`);

    for (const echo of echos) {
      if (echo.channel !== channel) continue;
      if (echoStr && echo.echo !== echoStr) continue;

      if (error) {
        echo.errorCallback(error);
        continue;
      }

      if (data instanceof Array && data.length === 1) echo.callback(data[0]);
      else echo.callback(data);
    }
  }

  addMsgEcho(type, channel, callback, errorCallback, echo = null) {
    const echos = this.echos[type];
    const id = uuidv4();

    if (!echos) throw new Error(`No such echo type: ${type}`);

    echos.push({ id, channel, callback, errorCallback, echo });
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
    const echo = this._echo('invoke');
    return new Promise((res, rej) => {
      const echoId = this.addMsgEcho('invoke', channel, (data) => {
        res(data);
        this.removeMsgEcho('invoke', echoId);
      }, (e) => {
        rej(e);
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
    return new Promise((res, rej) => {
      try {
        res(this._send({
          type: 'send',
          channel,
          params: [ ...params ],
          echo: this._echo('send'),
        }));
      } catch (e) {
        rej(e);
      }
    });
  }

  sendSync(channel, ...args) { // XXX: STOP USING IT YOU PLUGIN DEVELOPERS!
    const getIPCSyncURI = () => {
      return document.baseURI.substring(0, document.baseURI.lastIndexOf('/', document.baseURI.length - 2)) + '/ipc_send_sync';
    };
    const xhr = new XMLHttpRequest();
    xhr.open('POST', getIPCSyncURI(), false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      channel,
      params: [ ...args ],
    }));
    if (xhr.readyState !== 4) throw new Error('Your browser does not support synchronized HTTP request!');
    if (xhr.status !== 200) throw new Error('Request failed: ' + xhr.statusText);

    const response = JSON.parse(xhr.responseText);
    if (response.msg === 'ok') return response.data;
    else throw new Error('Request failed: ' + response.msg);
  }

  on(channel, listener) {
    const id = uuidv4();

    this.addMsgEcho('on', channel, (...data) => {
      listener(new CustomEvent('IpcRendererEvent'), ...data);
    }, (e) => console.error(e), id);

    this._send({
      type: 'on',
      channel,
      echo: id,
    });
    return id;
  }

  off(channel, listener) {
    for (let i = 0; i < this.echos.on.length; i++) {
      const echo = this.echos.on[i];

      if (echo.channel !== channel) continue;
      if (echo.callback !== listener) continue;

      this._send({
        type: 'off',
        channel,
        echo: echo.echo,
      });
      this.echos.on.splice(i, 1);
      return true;
    }
    return false;
  }
}
