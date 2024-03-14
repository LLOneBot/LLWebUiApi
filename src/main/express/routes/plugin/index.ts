import { Router } from 'express';
import { PluginInjectRouter } from './inject';
import * as Plugin from '@/main/express/controllers/plugin';

const router = Router();

router.use('/inject', PluginInjectRouter);

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
router.get('/:pluginSlug/preload.js', Plugin.GetPreload);
router.get('/:pluginSlug/renderer.js', Plugin.GetRenderer);
router.get('/:pluginSlug/iframe.html', Plugin.GetIframe);

router.get('/:pluginSlug/config', Plugin.GetConfig);
router.post('/:pluginSlug/config', Plugin.SetConfig);

export { router as PluginRouter };