import { Application } from 'express-ws';
import { IPCWebSocketHandler } from './controllers';

export const useWebSocket = (app: Application) => {
  app.ws('/ipc', IPCWebSocketHandler);
};