import { Router } from 'express';
import uploadRt from './api/uploadRt';
import uploadResizeRt from './api/uploadResizeRt';

const router = Router();
router.use('/', uploadRt);
router.use('/api/images/upload-resize', uploadResizeRt);
export default router;
