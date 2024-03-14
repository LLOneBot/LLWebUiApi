import { resolve } from 'path';
import { existsSync } from 'fs';
import { Router } from 'express';
import { Files } from '../controllers';

const BASE_DIR = LiteLoader.path.root;
const verifyPath = (path: string) => {
  const newPath = resolve(BASE_DIR, path);
  if (newPath.indexOf(BASE_DIR) !== 0) return false;
  else return true;
}

const router = Router();

// Verify if target path is valid
router.use((req, res, next) => {
  if (!req.body.path) {
    return res.status(400)
      .json({
        msg: 'No path specific',
      });
  }

  const path = resolve(BASE_DIR, req.body.path);
  if (!verifyPath(path)) {
    return res.status(400)
      .json({
        msg: 'Invaild path'
      });
  }

  if (!existsSync(path)) {
    return res.status(400)
      .json({
        msg: 'Target path not found'
      });
  }

  req.body.path = path;
  next();
});

// Routers
router.get('/list', Files.List);
router.post('/delete', Files.Delete);
router.get('/get', Files.Get);
router.post('/write', Files.Write);

export { router as FileRouter };