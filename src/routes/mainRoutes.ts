import { Router } from 'express';
import uploadRt from './api/uploadRt';
import resizeRt from './api/resizeRt';
import uploadResizeRt from './api/uploadResizeRt';


const router = Router();

router.use('/api', uploadRt);
router.use('/api', resizeRt);
router.use('/api/images/upload-resize', uploadResizeRt);

export default router;
