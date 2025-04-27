import express from 'express';
import mainRoutes from './routes/mainRoutes';
import resizeRt from './routes/api/resizeRt';

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Gekko: Main thingie');
});

// Use the main routes
app.use('/', mainRoutes);
app.use('/resize', resizeRt);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});