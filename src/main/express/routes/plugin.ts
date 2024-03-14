import { Router } from 'express';
import * as Plugin from '@/main/express/controllers/plugin';

const router = Router();

router.use((req, res, next) => {
  const { pluginSlug } = req.params;
  const pluginMeta = global.LiteLoader.plugins[pluginSlug];

  if (!pluginSlug || !pluginMeta) {
    return res.status(400)
      .json({
        msg: 'Plugin not found',
      });
  }

  res.locals.pluginMeta = pluginMeta;
  next();
});

router.get('/', Plugin.GetInfo);


export { router as PluginRouter };