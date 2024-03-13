import fs from 'fs';
import { FileType } from '@/main/action/types';
import { Request, Response } from 'express';

export const Delete = (req: Request, res: Response) => {
  const { type, path } = req.body;

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
  const { path } = req.body;

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