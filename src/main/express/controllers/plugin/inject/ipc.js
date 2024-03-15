;

class IPCWebSocket {
  constructor() {
    this.url = `${(location.protocol === 'https:' ? 'wss:' : 'ws:')}//${location.host}/ipc`;
    this.ws = new WebSocket(this.url);

    this.ws.addEventListener('open', () => this._onConnected());
  }

  _onConnected() {
    this.heartBeatClock = setInterval(() => this.sendPing(), 5000);
  }

  send(data) {
    return this.ws.send(JSON.stringify(data));
  }

  sendPing() {
    return this.send({
      type: 'ping',
      channel: 'WebApiInternal',
      echo: `ipc_ping_${Date.now()}`,
    });
  }
}