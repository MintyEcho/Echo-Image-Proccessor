import { Router } from 'express';
import { uploadMiddleware } from '../../controllers/ImageUpload';
import { uploadAndResize } from '../../controllers/uploadResize';

const router = Router();

// make this explicitly POST /api/images/upload-resize
router.post(
  '/upload-resize',
  uploadMiddleware.single('image'),
  uploadAndResize,
);

export default router;
