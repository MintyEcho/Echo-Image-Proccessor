// src/routes/mainRoutes.ts
import { Router } from 'express';
import uploadRt from './api/uploadRt'; // handles POST /api/images/upload
import uploadResizeRt from './api/uploadResizeRt'; // now handles POST /api/images/upload-resize
import resizeRt from './api/resizeRt'; // handles GET /preview
import x from './api/x'; // handles GET /api/images/dummy
const router = Router();

// both share the same “/api/images” prefix
router.use(uploadRt);
router.use(uploadResizeRt);
router.use(x);
// GET    /preview                   → resizeRt (for testing only)
router.use('/preview', resizeRt);

export default router;
