"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.uploadMiddleware = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
// Ensure uploads folder exists
const uploadDir = path_1.default.resolve(__dirname, '../../uploads');
if (!fs_1.default.existsSync(uploadDir))
    fs_1.default.mkdirSync(uploadDir);
// Multer setup (unchanged)
// src/controllers/ImageUpload.ts
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        // sanitize the original name (spaces→hyphens, remove unsafe chars)
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        const base = path_1.default
            .basename(file.originalname, ext)
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-]/gi, '');
        cb(null, `${base}${ext}`);
    },
});
const fileFilter = (_req, file, cb) => {
    if (path_1.default.extname(file.originalname).toLowerCase() !== '.png') {
        return cb(new Error('Only .png files are allowed'));
    }
    cb(null, true);
};
exports.uploadMiddleware = (0, multer_1.default)({ storage, fileFilter });
const uploadImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No .png file uploaded' });
            return;
        }
        // Any async post-processing could go here:
        // await someAsyncResizeOrUpload(req.file.path);
        res.status(201).json({
            message: 'Upload successful',
            filename: req.file.filename,
            path: req.file.path,
        });
        const filePath = path_1.default.join(__dirname, '../../uploads', req.file.originalname);
        if (fs_1.default.existsSync(filePath)) {
            res.status(409).json({ error: 'File already exists' });
        }
        return;
    }
    catch (err) {
        next(err);
    }
});
exports.uploadImage = uploadImage;
//# sourceMappingURL=ImageUpload.js.map