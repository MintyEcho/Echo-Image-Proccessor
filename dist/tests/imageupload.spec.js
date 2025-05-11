"use strict";
// src/tests/imageupload.spec.ts
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
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../index")); // ensure this exports your Express app
describe('Image Upload Endpoint', () => {
    const uploadUrl = '/api/images/upload';
    const fixturesDir = path_1.default.resolve(__dirname, 'test-images');
    const validPng = path_1.default.join(fixturesDir, 'sample.png');
    const invalidTxt = path_1.default.join(fixturesDir, 'not-image.txt');
    it('should successfully upload a PNG image and return metadata', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post(uploadUrl).attach('image', validPng);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(jasmine.objectContaining({
            message: 'Image uploaded successfully',
            filename: jasmine.any(String),
            path: jasmine.any(String),
        }));
    }));
    it('should return 400 if no image is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post(uploadUrl);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(jasmine.objectContaining({ error: 'No .png file uploaded' }) // Match the actual error message
        );
    }));
});
//# sourceMappingURL=imageupload.spec.js.map