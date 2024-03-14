import { Router } from 'express';
import * as Plugin from '@/main/express/controllers/plugin';

const router = Router();

router.use('/:pluginSlug', (req, res, next) => {
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

router.get('/:pluginSlug', Plugin.GetInfo);
router.get('/:pluginSlug/preload', Plugin.GetPreload);
router.get('/:pluginSlug/renderer', Plugin.GetRenderer);
router.get('/:pluginSlug/iframe', Plugin.GetIframe);

export { router as PluginRouter };