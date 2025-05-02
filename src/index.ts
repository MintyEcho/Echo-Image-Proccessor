import express from 'express';
import mainRoutes from './routes/mainRoutes';

const app = express();
app.use(express.json());
app.use(mainRoutes);

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
