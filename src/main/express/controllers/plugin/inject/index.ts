import InjectStyleColorRaw from './color.css?raw';
import InjectStyleRaw from './style.css?raw';
import InjectStyleWebComponents from './webcomponents.css?raw';
import InjectIPCRaw from './ipc.js?raw';
import InjectIframeRaw from './iframe.js?raw';
import InjectLLAPIRaw from './llapi.js?raw';
import { Request, Response } from 'express';

export const GetStyleColor = (req: Request, res: Response) => {
  res.set('Content-Type', 'text/css')
    .send(InjectStyleColorRaw);
}

export const GetStyle = (req: Request, res: Response) => {
  res.set('Content-Type', 'text/css')
    .send(InjectStyleRaw);
}

export const GetStyleWebComponents = (req: Request, res: Response) => {
  res.set('Content-Type', 'text/css')
    .send(InjectStyleWebComponents);
}

export const GetIPC = (req: Request, res: Response) => {
  res.set('Content-Type', 'text/javascript')
    .send(InjectIPCRaw);
}

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
