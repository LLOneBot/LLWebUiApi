import InjectIframeRaw from './iframe.js?raw';
import InjectLLAPIRaw from './llapi.js?raw';
import { Request, Response } from 'express';

export const GetJs = (req: Request, res: Response) => {
  res.set('Content-Type', 'text/javascript')
    .send(InjectIframeRaw);
}

export const GetLLAPI = (req: Request, res: Response) => {
  const LLStr = JSON.stringify(global.LiteLoader);
  let result = InjectLLAPIRaw;

  result = result.replace(/{\sLLDATA\s}/, LLStr);

  res.set('Content-Type', 'text/javascript')
    .send(result);
}
