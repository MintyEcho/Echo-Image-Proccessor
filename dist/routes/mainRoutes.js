"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/mainRoutes.ts
const express_1 = require("express");
const uploadRt_1 = __importDefault(require("./api/uploadRt")); // handles POST /api/images/upload
const uploadResizeRt_1 = __importDefault(require("./api/uploadResizeRt")); // now handles POST /api/images/upload-resize
const resizeRt_1 = __importDefault(require("./api/resizeRt")); // handles GET /preview
const x_1 = __importDefault(require("./api/x")); // handles GET /api/images/dummy
const router = (0, express_1.Router)();
// both share the same “/api/images” prefix
router.use(uploadRt_1.default);
router.use(uploadResizeRt_1.default);
router.use(x_1.default);
// GET    /preview                   → resizeRt (for testing only)
router.use('/preview', resizeRt_1.default);
exports.default = router;
//# sourceMappingURL=mainRoutes.js.map