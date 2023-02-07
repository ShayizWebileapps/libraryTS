import { Router } from "express";
const {validateToken,userType} = require('../utils')
const {listOfAdmin,addBook} = require('./module')

const router = Router();

router.get('/listOfAdmin',[validateToken,userType] ,async (req : any,res:any)=>{
   const users =  await listOfAdmin()
   res.json(users)
})

router.post('/addBook',[validateToken,userType],async(req : any,res : any) =>{
    try {
        const body : {bookname:string,publisheddate ?: Date,authorid : number,themeid : number,availability:number} = req.body;
        const book = await addBook(body)
        if(!book){
            res.json({error : "Not able to upload the book information"})
        }
        else{
            res.json(book)
        }

    } catch (error) {
        res.status(400).send("No able to update the info")
    }
    
})

module.exports = router