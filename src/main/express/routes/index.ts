import { Express, Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
  console.log(req.body);
  res.json({
    msg: 'Hello world!',
  })
});

export const useRoute = (app: Express) => {
  app.use('/', router);
};