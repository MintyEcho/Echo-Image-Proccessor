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
const express_1 = __importDefault(require("express"));
const ImageResize_1 = __importDefault(require("../../controllers/ImageResize"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resizeRt = express_1.default.Router();
resizeRt.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imagePath = path_1.default.join(__dirname, '../../../images/AY AY AY TO THE WINDOOOOOOOOOOOW.png');
    if (!fs_1.default.existsSync(imagePath)) {
        res.status(404).send('Image not found');
        return;
    }
    const imageBuffer = fs_1.default.readFileSync(imagePath);
    const resizedImage = yield (0, ImageResize_1.default)(imageBuffer, 200, 200);
    res.set('Content-Type', 'image/png'); // for PNG
    res.send(resizedImage);
}));
exports.default = resizeRt;
//# sourceMappingURL=resizeRt.js.map