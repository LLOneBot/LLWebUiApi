import { Express, Router } from 'express';
import { FileRouter } from './files';

const router = Router();

router.use('/files', FileRouter);

export const useRoute = (app: Express) => {
  app.all('/', (req, res) => {
    res.json({
      msg: 'LLWebAPI is now running!',
    });
  });
  
  app.get('/test', (req, res) => {
    console.log(req.body);
    res.json({
      msg: 'Hello world!',
    })
  });

  app.use('/api', router);
};