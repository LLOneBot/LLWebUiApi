import { Router } from 'express';
import { Inject as PluginInject } from '@/main/express/controllers/plugin';

const router = Router();

router.get('/js', PluginInject.GetJs);
router.get('/config/:pluginSlug', PluginInject.GetConfig);
router.post('/config/:pluginSlug', PluginInject.SetConfig);

export { router as PluginInjectRouter };