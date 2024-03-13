import { Express, Router } from 'express';

const router = Router();

router.all('/', (req, res) => {
  res.json({
    msg: 'LLWebAPI is now running!',
  });
});

router.get('/test', (req, res) => {
  console.log(req.body);
  res.json({
    msg: 'Hello world!',
  })
});

export const useRoute = (app: Express) => {
  app.use('/', router);
};