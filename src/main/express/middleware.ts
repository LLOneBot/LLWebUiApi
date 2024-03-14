import express from 'express';
import { resolve } from 'path';
import * as Utils from '@/main/helper/utils';
import { Application } from 'express-ws';


export const useMiddleware = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/static', express.static(resolve(Utils.PLUGIN_DIR, './static')));
}