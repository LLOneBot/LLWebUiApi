import express from 'express';
import { resolve } from 'path';
import * as Utils from '@/main/helper/utils';
import { Express } from "express";



export const useMiddleware = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/static', express.static(resolve(Utils.PLUGIN_DIR, './static')));
}