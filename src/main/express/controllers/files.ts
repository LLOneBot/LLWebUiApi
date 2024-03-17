import fs from 'fs';
import { resolve } from 'path';
import { FileType } from '@/main/express/types';
import { FileStateApi } from '@/common/types';
import { Request, Response } from 'express';

export const List = (req: Request, res: Response) => {
  const { path } = req.body;

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
  });
};

export const Delete = (req: Request, res: Response) => {
  const { type, path } = req.body;

  try {
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
  const { path } = req.body;

  if (fs.lstatSync(path).isDirectory()) {
    return res.status(400)
      .json({
        msg: 'Target is a directory',
      });
  }

  res.download(path);
}

export const Rename = (req: Request, res: Response) => {
  const { path, newPath } = req.body;

  if (fs.lstatSync(path).isDirectory()) {
    return res.status(400)
      .json({
        msg: 'Target is a directory',
      });
  }

  fs.rename(path, newPath)
    .then(() => {
      res.json({
        msg: 'ok',
      });
    })
    .catch((e) => {
      res.status(500)
        .json({
          msg: 'Internal server error',
          err: JSON.stringify(e, null, 2),
        })
    })
}

export const Write = (req: Request, res: Response) => {
  const { path, content } = req.body;

  fs.writeFile(path, content, { encoding: 'utf8' })
    .then(() => {
      res.json({
        msg: 'ok',
      });
    })
    .catch((e) => {
      res.status(500)
        .json({
          msg: 'Internal server error',
          err: JSON.stringify(e, null, 2),
        })
    });
}
