// src/index.ts
import express from 'express';
import path from 'path';
import mainRoutes from './routes/mainRoutes';

const app = express();

// Serve your frontend and uploads
app.use(express.static(path.join(__dirname, '../frontend/HTML')));
app.use('/css', express.static(path.join(__dirname, '../frontend/CSS')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// JSON parsing & API
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data
app.use(mainRoutes);

// Root route (serve index.html)
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/HTML/index.html'));
});


// === KEEP this at the very bottom ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  setInterval(() => {
    console.log('still alive...');
  }, 100000);})
  // **no process.exit()** and no code after this


  export default app; // for testing purposes
