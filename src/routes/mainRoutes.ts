import  express  from "express" ;
import resizeImage from "../controllers/ImageResize";
import { Request, Response } from "express" ;

const rtr = express.Router() ;

//resizing image
rtr.get('/', (req: Request, res: Response) => {
    const resizeQuery = req.query.resize;
    const width = parseInt(req.query.width as string, 10);
    const height = parseInt(req.query.height as string, 10);

    if (resizeQuery && !isNaN(width) && !isNaN(height)) {
        const imagePath = '../Images/' + resizeQuery;
        try {
            const resizedImage = resizeImage(Buffer.from(imagePath), width, height);
            res.send(resizedImage);
        } catch (error) {
            res.status(500).send('Error resizing the image: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
    } else {
        res.status(400).send('Please provide a valid image name in the "resize" query parameter and valid "width" and "height" values.');
    }
});

export default rtr ;