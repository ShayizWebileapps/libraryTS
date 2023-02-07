import { Router } from "express";
const cookieParser =require('cookie-parser');
const {passwordHash,comparePWD,createToken,validateToken,userType} = require('../utils')
const {userCreate,userLogin} = require('./module')

const router = Router();
router.post('/register', async (req : any,res:any)=>{
    const {username,password,email} = req.body;
    const hashed = await passwordHash(password);
    const user = await userCreate(username,hashed,email,false)
    if(user){
        res.json("User Registered")
    }
    else{
        res.json({status : "not able to create the user"});
    }
    

})
router.post('/login',async(req,res)=>{
    const user = await userLogin(req.body.username);
    if(user){
        const isMatch = await comparePWD(req.body.password,user.password)
        if(!isMatch){
            res.status(400).send("Incorrect password")
            return
        }
        const accessToken = createToken(user)
        res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 1000,
            httpOnly: true,
          });
        res.status(200).send("Logged in succesfully")


    }
    else{
        res.status(400).json({ error: "User Doesn't Exist" });
    }
    
})
router.get('/prfile',validateToken,(req: any,res: any)=>{

})
module.exports = router