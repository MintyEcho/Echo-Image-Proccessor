"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mainRoutes_1 = __importDefault(require("./routes/mainRoutes"));
const app = (0, express_1.default)();
// JSON parsing & API
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // for form data
app.use('/api/images', mainRoutes_1.default);
// Serve your frontend and uploads
app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/HTML')));
app.use('/css', express_1.default.static(path_1.default.join(__dirname, '../frontend/CSS')));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Root route (serve index.html)
app.get('/', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../frontend/HTML/index.html'));
});
// === KEEP this at the very bottom ===
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
    setInterval(() => {
        console.log('still alive...');
    }, 100000);
});
// **no process.exit()** and no code after this
exports.default = app; // for testing purposes
//# sourceMappingURL=index.js.map