import { Router } from 'express';
import { resolve } from 'path';
import fs from 'fs';

const router = Router();

const resolvePath = (basePath: string, targetPath: string) => {
  if (targetPath.indexOf('/') === 0) return resolve(basePath, `.${targetPath}`);
  else return resolve(basePath, targetPath);
}

router.use((req, res, next) => {
  const { path: targetPath } = req;
  const { pluginMeta } = res.locals;
  const basePath = pluginMeta.path.plugin;
  const realPath = resolvePath(basePath, targetPath);

  console.log(targetPath, basePath, realPath);

  if (realPath.indexOf(basePath) !== 0) {
    return res.status(400)
      .json({
        msg: 'Invaild request',
      });
  }

  if (!fs.existsSync(realPath)) {
    return res.status(404)
      .json({
        msg: 'No such file',
      });
  }

  res.download(realPath);
});

export { router as PluginFileRouter };