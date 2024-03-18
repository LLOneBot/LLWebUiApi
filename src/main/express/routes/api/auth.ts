import { Router } from 'express';
import { Auth } from '../../controllers';

const router = Router();

router.post('/login', Auth.Login);

export { router as AuthRouter };