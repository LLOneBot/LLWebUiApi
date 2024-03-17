import { IpcApiInvoke, IpcApiSend } from '@/main/helper/ipcHook';
import { WebsocketRequestHandler } from 'express-ws';

interface IWebSocketMessage {
  type: string,
  channel: string,
  params?: any, // Send
  data?: any, // Receive
  error?: any, // Receive
  echo?: any, // Optional
}

const IPCEventListeners: Array<{
  channel: string,
  id: string,
}> = [];

export const IPCWebSocketHandler: WebsocketRequestHandler = (ws, req) => {
  const sendMsg = (data: any) => ws.send(JSON.stringify(data));
  const IPCHandler = ({ type, channel, params = [], echo }: IWebSocketMessage) => {
    const result: IWebSocketMessage = { type, channel };
  
    if (echo !== undefined || echo !== null) {
      result.echo = echo;
    }
  
    console.log({ type, channel, params, echo });
    if (type === 'ping') {
      result.type = 'pong';
      sendMsg(result);
    } else if (type === 'invoke') {
      IpcApiInvoke(channel, params, (data) => {
        result.data = data;
        sendMsg(result);
      }, (e) => {
        result.error = e;
        sendMsg(result);
      });
    } else if (type === 'send') {
      IpcApiSend(channel, params);
      sendMsg(result);
    } else if (type === 'on') {
  
    }
    // sendMsg(result);
  };

  ws.on('message', async (msgRaw: string) => {
    let msg;

    try {
      msg = JSON.parse(msgRaw);
      await IPCHandler(msg);
    } catch (e) {
      console.log('Error processing WebSocket message');
      console.error(e);
    }
  });

  ws.on('error', (e: any) => {
    console.log('Error handling WebSocket connection');
    console.error(e);
  });

  ws.on('close', () => {
    console.log('Disconnected');
  });

  console.log('Connected');
};
