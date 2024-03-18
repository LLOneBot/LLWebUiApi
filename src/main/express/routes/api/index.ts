import { Router } from 'express';
import { FileRouter } from './files';
import { PanelRouter } from './panel';
import { AuthRouter } from './auth';
import { SysRouter } from './system';

const router = Router();

router.use('/files', FileRouter);
router.use('/panel', PanelRouter);
router.use('/auth', AuthRouter);
router.use('/sys', SysRouter)

export { router as APIRouter };