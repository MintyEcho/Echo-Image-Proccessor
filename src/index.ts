import path from 'path';
import express from 'express';
import mainRoutes from './routes/mainRoutes';

const app = express();

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend/HTML')));
app.use('/css', express.static(path.join(__dirname, '../frontend/CSS')));

// Parse JSON and routes
app.use(express.json());
app.use(mainRoutes);

// Serve index.html on GET /
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/HTML/index.html'));
});

// error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

export default app;
