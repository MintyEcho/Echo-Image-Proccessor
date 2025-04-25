import  Express  from "express" ;
const rtr = Express.Router() ;


rtr.get('/', (req, res) => {
    res.send('ECHO ECHO');
});

export default rtr ;