import { Router } from 'express';
import * as PluginInject from '@/main/express/controllers/plugin-inject';

const router = Router();

router.get('/js', PluginInject.GetJs);

export { router as PluginInjectRouter };