import { Router } from 'express';
import { Panel } from '../../controllers';
const router = Router();
router.get("/getWebState", Panel.getWebState)
router.get("/getQQLoginQRcode", Panel.getQQLoginQRcode)
export { router as PanelRouter };