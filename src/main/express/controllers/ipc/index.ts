import { WebsocketRequestHandler } from 'express-ws';

export const IPCHandler: WebsocketRequestHandler = (ws, req) => {
  const sendMsg = (msg: any) => ws.send(JSON.stringify(msg));
  const { slug: pluginSlug } = req.query;

  if (!pluginSlug || !global.LiteLoader.plugins[pluginSlug]) {
    sendMsg({
      code: 400,
      msg: 'No such plugin',
    });
    return ws.close();
  }

  ws.on('message', (_msg: string) => {
    let msg = _msg;

    try {
      msg = JSON.parse(_msg);
    } catch (e) {
      msg = _msg;
    }

    console.log(msg);
    sendMsg(msg);
  });

  ws.on('close', () => {
    console.log('IPC WebSocket disconnected');
  });
}