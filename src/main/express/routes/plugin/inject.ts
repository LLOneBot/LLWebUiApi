import { Router } from 'express';
import { Inject as PluginInject } from '@/main/express/controllers/plugin';

const router = Router();

router.get('/js', PluginInject.GetJs);

export { router as PluginInjectRouter };