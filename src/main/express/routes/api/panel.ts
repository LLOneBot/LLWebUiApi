import { Router } from 'express';
import { Panel } from '../../controllers';
const router = Router();
router.get("GetWebState", Panel.GetWebState)
export { router as PanelRouter };