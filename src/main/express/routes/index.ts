import { Express } from 'express';
import { APIRouter } from './api';
import { PluginRouter } from './plugin';

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

  app.use('/api', APIRouter);
  app.use('/plugin', PluginRouter);
};