import express from 'express';
import { expressjwt, Request } from 'express-jwt';
import { resolve } from 'path';
import * as Utils from '@/main/helper/utils';
import { Response, NextFunction } from 'express';
import { Application } from 'express-ws';


export const useMiddleware = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/static', express.static(resolve(Utils.PLUGIN_DIR, './static')));

  app.use(['/api', '/plugin', '/ipc'], expressjwt({
    secret: '1145141919810', // XXX: Change it before release
    algorithms: [ 'HS256' ],
  }).unless({
    path: [
      '/api/auth/login',
    ],
  }), (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError' || !req.auth || !req.auth.admin) {
      return res.status(401)
        .json({
          msg: 'Not logged in or auth expired',
        });
    }
    next();
  });
}