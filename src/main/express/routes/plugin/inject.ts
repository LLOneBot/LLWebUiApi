import { Router } from 'express';
import { Plugin } from '@/main/express/controllers';

const router = Router();

router.get('/ipc.js', Plugin.Inject.GetIPC);
router.get('/iframe.js', Plugin.Inject.GetJs);
router.get('/llapi.js', Plugin.Inject.GetLLAPI);

export { router as PluginInjectRouter };