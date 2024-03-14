import { resolve } from 'path';
import fs from 'fs';
import * as Utils from '@/main/helper/utils';
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

  res.download(preloadPath);
}