import { Router } from 'express';
import { Plugin } from '@/main/express/controllers';

const router = Router();

router.get('/color.css', Plugin.Inject.GetStyleColor);
router.get('/style.css', Plugin.Inject.GetStyle);
router.get('/ipc.js', Plugin.Inject.GetIPC);
router.get('/iframe.js', Plugin.Inject.GetJs);
router.get('/llapi.js', Plugin.Inject.GetLLAPI);

export { router as PluginInjectRouter };