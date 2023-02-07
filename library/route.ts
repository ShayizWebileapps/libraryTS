import { Router, Request, Response } from "express";
import { idText } from "typescript";

const { getBook, getBookById, available } = require('./module');

const router = Router();

router.get('/list', async (req: Request, res: Response) => {
    try {
        const book = await getBook()
        res.json(book)
    } catch (error) {
        res.send("Not able to fetch")

    }
})

router.get('/list/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await getBookById(id);
        if (data === null) {
            res.send('Not found!');
        } else {
            res.json(data)
        }

    } catch (error) {
        console.log(error)
    }

})

router.get('/availability', async (req: Request, res: Response) => {
    try {
        
        const data = await available()
        if (data == null){
            res.json({status : "no data is available"})
            return
        }
        res.json(data)
    
    } catch (error) {
        console.log("Error in availability")
        res.json({status : "No data found"})
    }

    // 
    // // console.log(data)

})
router.get('/availability/:id', async (req: Request, res: Response) => {
    try {
    
        const data = await available(req.params.id)
        if(data==null){
            res.json({status : "no data is available with the given id"});
            return
        }
        res.json(data)
    } catch (error) {
        res.json({status:"No data found"})
    }

    
    // console.log(data)

})
module.exports = router;