import { Application } from 'express-ws';
import { IPCHandler } from './controllers';

export const useWebSocket = (app: Application) => {
  app.ws('/ipc', (ws, req) => {
    ws.on('message', async (msgRaw: string) => {
      const sendMsg = (data: any) => ws.send(JSON.stringify(data));
      let msg;

      try {
        msg = JSON.parse(msgRaw);
        await IPCHandler(msg, sendMsg);
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
  });
};