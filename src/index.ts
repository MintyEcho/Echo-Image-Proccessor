import express from 'express';
import rtr from './routes/mainRoutes';
import resizeImage from './controllers/ImageResize';
const exp = express();
const PORT = 3000;

exp.use('/api', rtr);

exp.listen(PORT, ()=> {
    console.log(`server started at localhost:${PORT}`)
});