import express from 'express';
import { Express } from "express";



export const useMiddleware = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
}