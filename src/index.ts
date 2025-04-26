import express from 'express';
import rtr from './routes/mainRoutes';
import mainRoutes from "./routes/mainRoutes";
const exp = express();
const PORT = 3000;

exp.use(express.json());
exp.use('/', mainRoutes);
exp.use('/api', rtr);

exp.listen(PORT, ()=> {
    console.log(`server started at localhost:${PORT}`)
});