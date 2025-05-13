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
    // Ensure file exists
    if (!req.file) {
      res.status(400).json({ error: 'No image uploaded' });
      return;
    }

    // Validate width and height
    const width = parseInt(req.body.width);
    const height = parseInt(req.body.height);
    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      res.status(400).json({ error: 'Invalid width or height' });
      return;
    }

    // Read the uploaded file
    const filebuffer = fs.readFileSync(req.file.path);

    // Resize the image
    const buffer = await resizeImage(filebuffer, width, height);

    // Set response headers and send the resized image
    res.set('Content-Type', 'image/png'); // Assuming output is PNG
    res.send(buffer);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Clean up uploaded file
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
  }
}
