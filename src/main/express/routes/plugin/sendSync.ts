import { Router } from 'express';
import { IPCSendSyncHandler } from '@/main/express/controllers/ipc';

const router = Router();

router.post('/', IPCSendSyncHandler);

export { router as PluginIPCSendSyncRouter };
