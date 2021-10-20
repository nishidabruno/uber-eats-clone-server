import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { resolve } from 'path';

import { AppError } from '@errors/AppError';

import { router } from './routes';

import '@infra/container';

const app = express();

app.use(cors({ origin: [String(process.env.CORS_URL)] }));
app.use(express.json());
app.use(express.static(resolve(__dirname, '..', '..', '..', 'tmp')));

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server errror - ${err.message}`,
  });
});

export { app };
