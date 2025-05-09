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
const ImageResize_1 = __importDefault(require("../controllers/ImageResize"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
describe('Image Resize Function', () => {
    const inputImagePath = path_1.default.resolve(__dirname, './test-images/sample.jpg'); // Adjust the path to your test image
    const outputImagePath = path_1.default.resolve(__dirname, './test-images/output.jpg');
    afterEach(() => {
        // Clean up the output file after each test
        if (fs_1.default.existsSync(outputImagePath)) {
            fs_1.default.unlinkSync(outputImagePath);
        }
    });
    it('should resize the image to the specified dimensions', () => __awaiter(void 0, void 0, void 0, function* () {
        const width = 200;
        const height = 200;
        const imageBuffer = fs_1.default.readFileSync(inputImagePath);
        const resizedBuffer = yield (0, ImageResize_1.default)(imageBuffer, width, height);
        fs_1.default.writeFileSync(outputImagePath, resizedBuffer);
        const metadata = yield (0, sharp_1.default)(outputImagePath).metadata();
        expect(metadata.width).toBe(width);
        expect(metadata.height).toBe(height);
    }));
    it('should throw an error if the input buffer is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidBuffer = Buffer.from(''); // Empty buffer
        yield expectAsync((0, ImageResize_1.default)(invalidBuffer, 200, 200)).toBeRejectedWithError('Input buffer is invalid');
    }));
});
//# sourceMappingURL=resizeImage.spec.js.map