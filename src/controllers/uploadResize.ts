import { Request, Response } from 'express';
import resizeImage from './ImageResize';
import fs from 'fs';
import path from 'path';

const uploadDir = path.resolve(__dirname, '../../uploads');

export async function uploadAndResize(
  req: Request,
  res: Response
): Promise<void> {
  const filebuffer = fs.readFileSync(path.join(uploadDir, req.body.image));
  const width = parseInt(req.body.width);
  const height = parseInt(req.body.height);

  resizeImage(filebuffer, width, height).then((buffer) => {
    res.set('Content-Type', 'image/jpeg');
    res.send(buffer);
  });
}
