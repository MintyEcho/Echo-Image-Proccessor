import { Router } from 'express';
import uploadRt from './api/uploadRt';
import resizeRt from './api/resizeRt';

const router = Router();

router.use('/api', uploadRt);
router.use('/api', resizeRt);

export default router;
