import { Router } from 'express';

const router = Router();

router.use((req, res, next) => {
  if (req.method !== 'POST') return next();
  const { url } = req.body;

  fetch(url)
    .then(e => {
      res.status(e.status)
        .set('Content-Type', e.headers.get('Content-Type')!);
      return e.text();
    })
    .then(e => res.send(e))
    .catch(e => {
      res.status(500)
        .json({
          msg: 'Internal server error',
        });
      console.error(e);
    });
});

export { router as PluginProxyRouter };