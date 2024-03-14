import express from 'express';
import expressWs from 'express-ws';
import { useMiddleware } from './middleware';
import { useRoute } from './routes';
import { useWebSocket } from './websocket';
import { useErrorHandle } from './errorhandle';

const { app } = expressWs(express());

useMiddleware(app);
useRoute(app);
useWebSocket(app);
useErrorHandle(app);

export default app;