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
  console.log('⚙️  uploadAndResize called');
  console.log('⚙️  req.file:', req.file);
  console.log('⚙️  req.body:', req.body);

  try {
    console.log('📥 Received upload-resize request');
    console.log('Uploaded file:', req.file!.originalname);
    console.log('Width:', req.body.width, 'Height:', req.body.height);

    if (!req.file) {
      res.status(400).json({ error: 'No image uploaded' });
      return;
    }

    const { width, height } = req.body;
    const w = parseInt(width as string, 10);
    const h = parseInt(height as string, 10);

    if (isNaN(w) || isNaN(h)) {
      res.status(400).json({ error: 'Invalid width or height' });
    }

    const ext = path.extname(req.file!.originalname).toLowerCase();
    const base = path.basename(req.file!.originalname, ext)
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9\-]/g, '');
    const targetName = `${base}${ext}`;
    const targetPath = path.join(uploadDir, targetName);

    let imageBuffer: Buffer;
    if (fs.existsSync(targetPath)) {
      console.log('⚙️  Using existing image:', targetName);
      fs.unlinkSync(req.file!.path);
      imageBuffer = fs.readFileSync(targetPath);
    } else {
      console.log('⚙️  Saving new upload as:', targetName);
      fs.renameSync(req.file!.path, targetPath);
      imageBuffer = fs.readFileSync(targetPath);
    }

    const resizedBuffer = await resizeImage(imageBuffer, w, h);
    res.set('Content-Type', 'image/png');
    res.send(resizedBuffer);

  } catch (err) {
    console.error('❌ uploadAndResize error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
    return next(err);
  }
}
