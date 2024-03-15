import { Application } from 'express-ws';
import { IPCHandler } from './controllers';

export const useWebSocket = (app: Application) => {
  app.ws('/ipc', IPCHandler);
};