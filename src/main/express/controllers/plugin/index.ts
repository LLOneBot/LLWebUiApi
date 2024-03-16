import { resolve } from 'path';
import fs from 'fs';
import * as Utils from '@/main/helper/utils';
import PluginIframeRaw from './iframe.html?raw';
import { Request, Response } from 'express';

const isEmpty = (data: any) => data === undefined || data === null || data === '';

export const GetInfo = (req: Request, res: Response) => {
  const { pluginMeta } = res.locals;
  res.json({
    msg: 'ok',
    data: pluginMeta,
  });
}

export const GetIframe = (req: Request, res: Response) => {
  const { pluginMeta, pluginSlug } = res.locals;
  const baseUrl = `${req.protocol}://${req.get('host')}/plugin/${pluginSlug}/files/`;
  let result = PluginIframeRaw.toString();
  
  if (isEmpty(pluginMeta.path.injects.preload) || isEmpty(pluginMeta.path.injects.renderer)) {
    return res.status(400)
      .send('Plugin did not provide preloader or renderer');
  }

  result = result.replace(/{\sBASE_URL\s}/g, baseUrl);
  result = result.replace('<!--{ INJECT_JS }-->', `<script>window._LOAD_PLUGIN_('${pluginSlug}');</script>`);

  res.send(result);
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

export * as Inject from './inject';