import { WebsocketRequestHandler } from 'express-ws';

export const IPCHandler = (msg: any, sendMsg: (data: any) => void) => {
  console.log(msg);
  sendMsg(msg);
}