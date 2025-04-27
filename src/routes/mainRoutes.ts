import  express  from "express" ;
import resizeImage from "../controllers/ImageResize";
import { Request, Response } from "express" ;

const rtr = express.Router() ;

rtr.get('/', (req: Request, res: Response) => {
    res.send('I am echo of the mint');
});

export default rtr ;