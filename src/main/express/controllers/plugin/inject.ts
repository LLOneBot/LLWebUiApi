import InjectLLAPIRaw from '@static/plugin/llapi.js?raw';
import { Request, Response } from 'express';

export const GetJs = (req: Request, res: Response) => {
  const LLStr = JSON.stringify(global.LiteLoader);
  let result = InjectLLAPIRaw;

  result = result.replace(/{\sLLDATA\s}/, LLStr);

  res.set('Content-Type', 'text/javascript')
    .send(result);
}

export const GetConfig = (req: Request, res: Response) => {
  const { pluginSlug } = req.params;

  if (!pluginSlug || !global.LiteLoader.plugins[pluginSlug]) {
    return res.status(400)
      .json({
        msg: 'No such plugin',
      });
  }

  try {
    const result = global.LiteLoader.api.config.get(pluginSlug, {});
    res.json({
      msg: 'ok',
      data: result
    });
  } catch (e) {
    res.status(500)
      .json({
        msg: 'Internal server error',
        err: JSON.stringify(e, null, 2)
      });
  }
}

export const SetConfig = (req: Request, res: Response) => {
  const { pluginSlug } = req.params;
  const { newConfig } = req.body;

  if (!pluginSlug || !global.LiteLoader.plugins[pluginSlug]) {
    return res.status(400)
      .json({
        msg: 'No such plugin',
      });
  }
  if (!newConfig) {
    return res.status(400)
      .json({
        msg: 'No config provided',
      });
  }

  try {
    global.LiteLoader.api.config.set(pluginSlug, newConfig);
    res.json({
      msg: 'ok'
    });
  } catch (e) {
    res.status(500)
      .json({
        msg: 'Internal server error',
        err: JSON.stringify(e, null, 2)
      });
  }
}