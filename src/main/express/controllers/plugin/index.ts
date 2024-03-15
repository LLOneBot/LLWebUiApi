import { resolve } from 'path';
import fs from 'fs';
import * as Utils from '@/main/helper/utils';
import PluginIframeRaw from './iframe.html?raw';
import { Request, Response } from 'express';

export const GetInfo = (req: Request, res: Response) => {
  const { pluginMeta } = res.locals;
  res.json({
    msg: 'ok',
    data: pluginMeta,
  });
}

export const GetPreload = (req: Request, res: Response) => {
  const { pluginMeta } = res.locals;
  const preloadPath = resolve(pluginMeta.path.plugin, pluginMeta.path.injects.preload);

  if (!fs.existsSync(preloadPath)) {
    return res.status(400)
      .json({
        msg: 'File not found',
      });
  }

  res.set('Content-Type', 'text/javascript')
    .download(preloadPath);
}

export const GetRenderer = (req: Request, res: Response) => {
  const { pluginMeta } = res.locals;
  const rendererPath = resolve(pluginMeta.path.plugin, pluginMeta.path.injects.renderer);

  if (!fs.existsSync(rendererPath)) {
    return res.status(400)
      .json({
        msg: 'File not found',
      });
  }

  res.set('Content-Type', 'text/javascript')
    .download(rendererPath);
}

export const GetIframe = (req: Request, res: Response) => {
  const { pluginMeta } = res.locals;
  const baseUrl = req.protocol + '://' + req.get('host') + '/';
  let result = PluginIframeRaw.toString();

  result = result.replace(/{\sBASE_URL\s}/g, baseUrl);
  result = result.replace('<!--{ INJECT_JS }-->', `<script>window._LOAD_PLUGIN_('${req.params.pluginSlug}');</script>`);

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