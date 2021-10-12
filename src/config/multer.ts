import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (_req, file, cb) => {
      const fileNameCrypo = crypto.randomBytes(16).toString('hex');
      const fileName = `${fileNameCrypo}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
