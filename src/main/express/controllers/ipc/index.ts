import { IPCExecuteCall, IpcApiSend } from '@/main/helper/ipcHook';

interface IWebSocketMessage {
  type: string,
  channel: string,
  params?: any, // Send
  data?: any, // Receive
  error?: any, // Receive
  echo?: any, // Optional
}

export const IPCHandler = ({ type, channel, params = [], echo }: IWebSocketMessage, sendMsg: (data: any) => void) => {
  const result: IWebSocketMessage = { type, channel };

  if (echo !== undefined || echo !== null) {
    result.echo = echo;
  }

  console.log({ type, channel, params, echo });
  if (type === 'ping') {
    result.type = 'pong';
    sendMsg(result);
  } else if (type === 'invoke') {
    IPCExecuteCall(channel, params, (data) => {
      result.data = data;
      sendMsg(result);
    }, (e) => {
      result.error = e;
      sendMsg(result);
    });
  }else if(type=='send'){
    IpcApiSend(channel,params);
    sendMsg("{}");
  }
  // sendMsg(result);
}