import { resolve } from 'path';
import { existsSync } from 'fs';
import { Router } from 'express';
import { Files } from '../../controllers';

const BASE_DIR = LiteLoader.path.root;
const resolveVerifiedOrThrow = (path: string) => {
  const newPath = resolve(BASE_DIR, path);
  if (newPath.indexOf(BASE_DIR) !== 0) {
    throw 'unsafe-usage'
  }
  return newPath
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

  let correctPath: string;
  try {
    correctPath = resolveVerifiedOrThrow(req.body.path);
  } catch (_err) {
    return res.status(400)
      .json({
        msg: 'Invaild path'
      });
  }

  if (!existsSync(correctPath)) {
    return res.status(400)
      .json({
        msg: 'Target path not found'
      });
  }

  req.body.path = correctPath;

  if (req.body.newPath) {
    let correctNewPath: string;
    try {
      correctNewPath = resolveVerifiedOrThrow(req.body.newPath);
    } catch (_err) {
      return res.status(400)
          .json({
            msg: 'Invaild newPath'
          });
    }

    req.body.newPath = correctNewPath
  }

  next();
});

// Routers
router.get('/list', Files.List);
router.post('/delete', Files.Delete);
router.get('/get', Files.Get);
router.post('/rename', Files.Rename);
router.post('/write', Files.Write);

export { router as FileRouter };