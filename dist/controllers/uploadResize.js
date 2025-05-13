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
exports.uploadAndResize = uploadAndResize;
const ImageResize_1 = __importDefault(require("./ImageResize"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploadDir = path_1.default.resolve(__dirname, '../../uploads');
function uploadAndResize(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Ensure file exists
            if (!req.file) {
                res.status(400).json({ error: 'No image uploaded' });
                return;
            }
            // Validate width and height
            const width = parseInt(req.body.width);
            const height = parseInt(req.body.height);
            if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
                res.status(400).json({ error: 'Invalid width or height' });
                return;
            }
            // Read the uploaded file
            const filebuffer = fs_1.default.readFileSync(req.file.path);
            // Resize the image
            const buffer = yield (0, ImageResize_1.default)(filebuffer, width, height);
            // Set response headers and send the resized image
            res.set('Content-Type', 'image/png'); // Assuming output is PNG
            res.send(buffer);
        }
        catch (error) {
            console.error('Error processing image:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
        finally {
            // Clean up uploaded file
            if (req.file && req.file.path) {
                fs_1.default.unlink(req.file.path, (err) => {
                    if (err)
                        console.error('Error deleting file:', err);
                });
            }
        }
    });
}
//# sourceMappingURL=uploadResize.js.map