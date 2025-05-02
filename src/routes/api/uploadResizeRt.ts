import express from 'express';
import { uploadMiddleware } from '../../controllers/ImageUpload';
import { uploadAndResize } from '../../controllers/uploadResize';

const uploadResizeRt = express.Router();

uploadResizeRt.post(
  '/',
  uploadMiddleware.single('image'),
  uploadAndResize
);

export default uploadResizeRt;
