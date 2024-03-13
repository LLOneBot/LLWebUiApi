import { Express } from 'express';

export const useErrorHandle = (app: Express) => {
  app.use('*', (req, res) => {
    res.status(404)
      .json({
        msg: 'Unknown API'
      });
  });
}