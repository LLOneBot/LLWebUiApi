import { Router } from 'express';
import { Files } from '../controllers';

const router = Router();

router.post('/delete', Files.Delete);

export { router as FileRouter };