import  express  from "express" ;
import resizeRt from "./api/resizeRt";


const rtr = express.Router() ;

rtr.use('/resize', resizeRt);

export default rtr ;