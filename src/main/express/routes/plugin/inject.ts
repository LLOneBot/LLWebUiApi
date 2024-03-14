import { Router } from 'express';
import { Inject as PluginInject } from '@/main/express/controllers/plugin';

const router = Router();

router.get('/iframe.js', PluginInject.GetJs);
router.get('/llapi.js', PluginInject.GetLLAPI);

export { router as PluginInjectRouter };