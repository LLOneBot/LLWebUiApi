import { Router } from 'express';
import { FileRouter } from './files';
import { PanelRouter } from './panel';
import { AuthRouter } from './auth';

const router = Router();

router.use('/files', FileRouter);
router.use('/panel', PanelRouter);
router.use('/auth', AuthRouter);

export { router as APIRouter };