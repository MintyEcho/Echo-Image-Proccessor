"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ImageUpload_1 = require("../../controllers/ImageUpload");
const uploadResize_1 = require("../../controllers/uploadResize");
const router = (0, express_1.Router)();
// make this explicitly POST /api/images/upload-resize
router.post('/upload-resize', ImageUpload_1.uploadMiddleware.single('image'), uploadResize_1.uploadAndResize);
exports.default = router;
//# sourceMappingURL=uploadResizeRt.js.map