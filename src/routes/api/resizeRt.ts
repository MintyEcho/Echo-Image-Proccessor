import express from 'express';
import resizeImage from '../../controllers/ImageResize';
import fs from 'fs';
import path from 'path';
const resizeRt = express.Router();


resizeRt.get('/', async (req, res) => {

    const imagePath = path.join(__dirname, '../../../images/AY AY AY TO THE WINDOOOOOOOOOOOW.png');
    if (!fs.existsSync(imagePath)) {
        res.status(404).send('Image not found');
        return;
    }
    const imageBuffer = fs.readFileSync(imagePath);
    
    const resizedImage = await resizeImage(imageBuffer, 200, 200);
    console.log(resizedImage); // Log the resolved path
    res.set('Content-Type', 'image/png');  // for PNG
    res.send(resizedImage)});

export default resizeRt