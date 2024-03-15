
interface IWebSocketMessage {
  type: string,
  channel: string,
  params?: any, // Send
  data?: any, // Receive
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
  } else {
    return sendMsg({ type, channel, params, echo });
  }
  sendMsg(result);
}