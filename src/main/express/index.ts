import express from 'express';
import { useMiddleware } from './middleware';
import { useRoute } from './routes';

const app = express();

useMiddleware(app);
useRoute(app);

export default app;