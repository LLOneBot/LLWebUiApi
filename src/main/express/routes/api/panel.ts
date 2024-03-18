import { Router } from 'express';
import { Panel } from '../../controllers';
const router = Router();
router.get("/getWebState", Panel.getWebState);
router.get("/getQQLoginQRcode", Panel.getQQLoginQRcode);
router.get("/getQQLoginQRcodeBase64", Panel.getQQLoginQRcodBase64);
export { router as PanelRouter };