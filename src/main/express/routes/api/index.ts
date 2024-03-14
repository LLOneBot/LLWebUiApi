import { Router } from 'express';
import { FileRouter } from './files';

const router = Router();

router.use('/files', FileRouter);

export { router as APIRouter };