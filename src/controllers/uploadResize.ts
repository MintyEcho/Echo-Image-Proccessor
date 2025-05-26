import { Request, Response } from 'express';
import resizeImage from './ImageResize';
import fs from 'fs';
import path from 'path';

const uploadDir = path.resolve(__dirname, '../../uploads');

export async function uploadAndResize(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Accept filename instead of file
    const filename = req.body.image;
    if (!filename) {
      res.status(400).json({ error: 'No image filename provided' });
      return;
    }

    // Validate width and height
    const width = parseInt(req.body.width);
    const height = parseInt(req.body.height);
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      res.status(400).json({ error: 'Invalid width or height' });
      return;
    }

    // Read the image file from disk
    const filePath = path.join(uploadDir, filename);
    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: 'Image file not found' });
      return;
    }
    const filebuffer = fs.readFileSync(filePath);

    // Resize the image
    const buffer = await resizeImage(filebuffer, width, height);

    // Set response headers and send the resized image
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
