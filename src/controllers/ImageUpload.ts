import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Ensure uploads folder exists
const uploadDir = path.resolve(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer setup (unchanged)
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext);
    cb(null, `${base}-${timestamp}${ext}`);
  }
});
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (path.extname(file.originalname).toLowerCase() !== '.png') {
    return cb(new Error('Only .png files are allowed'));
  }
  cb(null, true);
};
export const uploadMiddleware = multer({ storage, fileFilter });

/**
 * This is the handler you just pasted in:
 */
export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No .png file uploaded' });
      return;
    }

    // Any async post-processing could go here:
    // await someAsyncResizeOrUpload(req.file.path);

    res.status(201).json({
      message: 'Upload successful',
      filename: req.file.filename,
      path: req.file.path,
    });
    return;
  } catch (err) {
    next(err);
  }
};
