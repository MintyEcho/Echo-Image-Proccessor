// src/controllers/uploadAndResize.ts
import { Request, Response, NextFunction } from 'express';
import resizeImage from './ImageResize'; // your buffer-based function
import fs from 'fs';
import path from 'path';

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

    const buffer = fs.readFileSync(req.file.path);

    const resizedBuffer = await resizeImage(buffer, w, h);

    res.set('Content-Type', 'image/png');
    res.send(resizedBuffer); // ✅ just call, don’t return
  } catch (err) {
    next(err);
  }
}
