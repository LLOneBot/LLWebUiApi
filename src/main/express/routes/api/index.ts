import { Router } from 'express';
import { FileRouter } from './files';
import { PanelRouter } from './panel';

const router = Router();

router.use('/files', FileRouter);
router.use('/panel', PanelRouter);
export { router as APIRouter };