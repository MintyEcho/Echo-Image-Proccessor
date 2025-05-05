// src/routes/mainRoutes.ts
import { Router } from 'express';
import uploadRt       from './api/uploadRt';         // handles POST /api/images/upload
import uploadResizeRt from './api/uploadResizeRt';   // now handles POST /api/images/upload-resize
import resizeRt      from './api/resizeRt';        // handles GET /preview
const router = Router();

// both share the same “/api/images” prefix
router.use('/api/images', uploadRt);
router.use('/api/images', uploadResizeRt);

// GET    /preview                   → resizeRt (for testing only)
router.use('/preview', resizeRt);

export default router;

