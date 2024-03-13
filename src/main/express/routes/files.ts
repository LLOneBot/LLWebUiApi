import { Router } from 'express';
import { Files } from '../controllers';

const router = Router();

router.post('/delete', Files.Delete);
router.get('/get', Files.Get);

export { router as FileRouter };