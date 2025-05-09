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
const sharp_1 = __importDefault(require("sharp"));
function resizeImage(imageBuffer, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!imageBuffer || imageBuffer.length === 0) {
                throw new Error('Input buffer is invalid');
            }
            const resizedImage = yield (0, sharp_1.default)(imageBuffer)
                .resize(width, height)
                .png() // Ensure the output is in png format
                .toBuffer();
            return resizedImage;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error('Error resizing image: ' + error.message);
            }
            else {
                throw new Error('Error resizing image: Unknown error');
            }
        }
    });
}
exports.default = resizeImage;
//# sourceMappingURL=ImageResize.js.map