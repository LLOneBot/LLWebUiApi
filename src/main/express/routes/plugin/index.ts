import { Router } from 'express';
import { PluginInjectRouter } from './inject';
import { PluginFileRouter } from './file';
import { PluginProxyRouter } from './proxy';
import { Plugin } from '@/main/express/controllers';

const router = Router();

router.use('/inject', PluginInjectRouter);

router.use('/:pluginSlug', (req, res, next) => {
  const { pluginSlug } = req.params;
  const pluginMeta = global.LiteLoader.plugins[pluginSlug];

  if (!pluginSlug || !pluginMeta) {
    return res.status(404)
      .json({
        msg: 'Plugin not found',
      });
  }

  if (pluginMeta.disabled) {
    return res.status(404)
      .json({
        msg: 'Plugin is disabled',
      });
  }

  res.locals.pluginSlug = pluginSlug;
  res.locals.pluginMeta = pluginMeta;
  next();
});

router.get('/:pluginSlug', Plugin.GetInfo);
router.get('/:pluginSlug/iframe.html', Plugin.GetIframe);

router.get('/:pluginSlug/config', Plugin.GetConfig);
router.post('/:pluginSlug/config', Plugin.SetConfig);

router.use('/:pluginSlug/files', PluginFileRouter);
router.use('/:pluginSlug/proxy', PluginProxyRouter);

export { router as PluginRouter };