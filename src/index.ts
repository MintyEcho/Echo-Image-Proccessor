import express from 'express';

const exp = express();
const PORT = 3000;

exp.get('/api', (req, res) => {
    res.send('Hello, world!');
});
exp.listen(PORT, ()=> {
    console.log(`server started at localhost:${PORT}`)
});
