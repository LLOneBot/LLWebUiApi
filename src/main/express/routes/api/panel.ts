import { Router } from 'express';
import { Panel } from '../../controllers';
const router = Router();
router.get("/getWebState", Panel.getWebState)
export { router as PanelRouter };