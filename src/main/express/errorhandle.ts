import { Application } from 'express-ws';

export const useErrorHandle = (app: Application) => {
  app.use('*', (req, res) => {
    res.status(404)
      .json({
        msg: 'Unknown API'
      });
  });
}