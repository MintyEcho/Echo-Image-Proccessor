import { Router } from 'express';
import { uploadMiddleware, uploadImage } from '../../controllers/ImageUpload';

const router = Router();

// POST /api/images/upload
router.post('/images/upload', uploadMiddleware.single('image'), uploadImage);

export default router;
