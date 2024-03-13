import fs from 'fs';
import { resolve } from 'path';
import { FileType } from '@/main/action/types';
import { FileStateApi } from '@/common/types';
import { Request, Response } from 'express';

const BASE_DIR = LiteLoader.path.root;
const verifyPath = (path: string) => {
  const newPath = resolve(BASE_DIR, path);
  if (newPath.indexOf(BASE_DIR) !== 0) return false;
  else return true;
}

export const List = (req: Request, res: Response) => {
  const path = resolve(BASE_DIR, req.body.path);

  if (!verifyPath(path)) {
    return res.status(400)
      .json({
        msg: 'Invaild path'
      });
  }

  if (!fs.lstatSync(path).isDirectory()) {
    return res.status(400)
      .json({
        msg: 'Target is not a directory'
      })
  }

  const files = fs.readdirSync(path);
  let result: FileStateApi[] = [];

  files.forEach((filename) => {
    const fileDir = resolve(path, filename);
    const stats = fs.statSync(fileDir);
    
    result.push({
      filename: filename,
      filetype: stats.isDirectory() ? FileType.PATH : FileType.FILE,
      ...stats,
    });
  });

  res.json({
    msg: 'ok',
    data: result,
  })
};

export const Delete = (req: Request, res: Response) => {
  const { type } = req.body;
  const path = resolve(BASE_DIR, req.body.path);

  if (!verifyPath(path)) {
    return res.status(400)
      .json({
        msg: 'Invaild path'
      });
  }

  try {
    if (!fs.existsSync(path)) {
      return res.status(400)
        .json({
          msg: 'File not exist',
        });
    }

    if (type === FileType.FILE) fs.unlinkSync(path);
    if (type === FileType.PATH) fs.rmdirSync(path);
    res.json({
      msg: 'ok'
    });

  } catch (e) {
    res.status(500)
      .json({
        msg: 'Internal server error',
      })
  }
}

export const Get = (req: Request, res: Response) => {
  const path = resolve(BASE_DIR, req.body.path);

  if (!verifyPath(path)) {
    return res.status(400)
      .json({
        msg: 'Invaild path'
      });
  }

  if (!fs.existsSync(path)) {
    return res.status(400)
      .json({
        msg: 'File not exist',
      });
  }

  if (fs.lstatSync(path).isDirectory()) {
    return res.status(400)
      .json({
        msg: 'Target is a directory',
      });
  }

  res.download(path);
}