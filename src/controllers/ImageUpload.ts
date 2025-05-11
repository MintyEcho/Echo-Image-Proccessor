import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Ensure uploads folder exists
const uploadDir = path.resolve(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer setup (unchanged)
// src/controllers/ImageUpload.ts

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    // sanitize the original name (spaces→hyphens, remove unsafe chars)
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path
      .basename(file.originalname, ext)
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/gi, '');
    cb(null, `${base}${ext}`);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (path.extname(file.originalname).toLowerCase() !== '.png') {
    return cb(new Error('Only .png files are allowed'));
  }
  cb(null, true);
};
export const uploadMiddleware = multer({ storage, fileFilter });

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

    res.status(200).json({
      message: 'Image uploaded successfully',
      filename: req.file.filename,
      path: req.file.path,
    });
    const filePath = path.join(
      __dirname,
      '../../uploads',
      req.file.originalname
    );
    if (fs.existsSync(filePath)) {
      res.status(409).json({ error: 'File already exists' });
    }
    return;
  } catch (err) {
    next(err);
  }
};
