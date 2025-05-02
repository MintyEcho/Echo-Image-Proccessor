import { Request, Response, NextFunction } from 'express';
import resizeImage from './ImageResize';
import fs from 'fs';
import path from 'path';

const uploadDir = path.resolve(__dirname, '../../uploads');

export async function uploadAndResize(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No image uploaded' });
      return;
    }

    const { width, height } = req.body;
    const w = parseInt(width, 10);
    const h = parseInt(height, 10);

    if (isNaN(w) || isNaN(h)) {
      res.status(400).json({ error: 'Invalid width or height' });
      return;
    }

    const ext = path.extname(req.file.originalname).toLowerCase();
    const base = path.basename(req.file.originalname, ext);
    const targetName = `${base}${ext}`;
    const targetPath = path.join(uploadDir, targetName);

    // If the original file already exists, use it and delete the temp one
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(req.file.path); // clean up the new upload
      const existingBuffer = fs.readFileSync(targetPath);
      const resizedBuffer = await resizeImage(existingBuffer, w, h);

      res.set('Content-Type', 'image/png');
      res.send(resizedBuffer);
      return;
    }

    // Else rename the uploaded file to the clean name and continue
    fs.renameSync(req.file.path, targetPath);
    const buffer = fs.readFileSync(targetPath);
    const resizedBuffer = await resizeImage(buffer, w, h);

    res.set('Content-Type', 'image/png');
    res.send(resizedBuffer);
  } catch (err) {
    next(err);
  }
}
