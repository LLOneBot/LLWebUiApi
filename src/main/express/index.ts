import express from 'express';
import { useMiddleware } from './middleware';
import { useRoute } from './routes';
import { useErrorHandle } from './errorhandle';

const app = express();

useMiddleware(app);
useRoute(app);
useErrorHandle(app);

export default app;