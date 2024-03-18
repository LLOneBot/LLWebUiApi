import { Router } from 'express';
import { Panel } from '../../controllers';
const router = Router();
router.get("/getWebUiState", Panel.getWebUiState);
router.get("/getQQLoginQRcode", Panel.getQQLoginQRcode);
router.get("/getQQLoginQRcodeBase64", Panel.getQQLoginQRcodBase64);
router.get("/setWebUiConfig", Panel.setWebUiConfig);

export { router as PanelRouter };