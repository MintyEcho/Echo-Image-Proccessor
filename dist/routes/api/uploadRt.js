"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ImageUpload_1 = require("../../controllers/ImageUpload");
const router = (0, express_1.Router)();
// POST /api/images/upload
router.post('/upload', ImageUpload_1.uploadMiddleware.single('image'), ImageUpload_1.uploadImage);
exports.default = router;
//# sourceMappingURL=uploadRt.js.map