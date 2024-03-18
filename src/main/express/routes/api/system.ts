import { Router } from 'express';
import { System } from '../../controllers';
const router = Router();
router.get("/cpu", System.getCpu);
router.get("/memory", System.getMemory);
router.get("/os", System.getOS);
export { router as SysRouter };