import { IpcApiInvoke, IpcApiSend, addIpcRendererListener, removeIpcRendererListener } from '@/main/helper/ipcHook';
import { WebsocketRequestHandler } from 'express-ws';

interface IWebSocketMessage {
  type: string,
  channel: string,
  params?: any, // Send
  data?: any, // Receive
  error?: any, // Receive
  echo?: any, // Optional
}

export const IPCWebSocketHandler: WebsocketRequestHandler = (ws, _req) => {
  const IPCEventListeners: Array<{
    channel: string,
    id: string,
    callback: (e: string, args: any[]) => void | Promise<void>,
  }> = [];
  const sendMsg = (data: any) => ws.send(JSON.stringify(data));
  const IPCHandler = ({ type, channel, params = [], echo }: IWebSocketMessage) => {
    const result: IWebSocketMessage = { type, channel };

    if (echo !== undefined || echo !== null) {
      result.echo = echo;
    }

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
      const callback = (_channel: string, args: any[]) => {
        sendMsg({
          type: 'event',
          channel,
          data: [...args],
          echo,
        });
      };

      IPCEventListeners.push({
        channel,
        id: echo,
        callback,
      });
      addIpcRendererListener(channel, callback);
      sendMsg({ type, channel, echo });
    } else if (type === 'off') {
      for (let i = 0; i < IPCEventListeners.length; i++) {
        const listener = IPCEventListeners[i];

        if (listener.channel !== channel) continue;
        if (listener.id !== echo) continue;

        removeIpcRendererListener(channel, listener.callback);
        return sendMsg({ type, channel, echo });
      }
      return sendMsg({ type, channel, error: 'Listener ID not found', echo });
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
    for (const listener of IPCEventListeners) {
      removeIpcRendererListener(listener.channel, listener.callback);
    }
    console.log('Disconnected');
  });

  console.log('Connected');
};

export * from './sendSync';