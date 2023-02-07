const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const {sign,verify,decode} = require('jsonwebtoken')
const sequelize = new Sequelize('library', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});
const dbConnection = async  () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
const passwordHash = async(pwd : string) =>{
   return await bcrypt.hash(pwd,10)
};
const comparePWD = async(pwd : string,dbPWD:string)=>{
    const isMatch = await bcrypt.compare(pwd,dbPWD);
    return isMatch;
}
const createToken =  (user:any)=>{
    const accessToken =  sign({username : user.username,id : user.user_id,admin : user.user_type},'libraryProject');
    return accessToken
    
}

const validateToken = (req : any,res :any,next :any) =>{
    const accessToken = req.cookies["access-token"];
    
    if(!accessToken){
        return res.status(400).send("User does not authenticated")
    }
    try {
        const validToken = verify(accessToken, "libraryProject");
        
        if(validToken)
        {
            req.authenticated = true;
            return next()
        }
    } catch (error) {
        return res.status(400).json({err : error})
    }
}
const userType = (req : any,res : any,next : any)=>{
    const accessToken = req.cookies["access-token"];
    const base64Url = accessToken.split('.')[1];
    const base64 : any = JSON.parse(Buffer.from(base64Url, 'base64').toString('binary'));
    if(base64.admin){
        return next()
    }
    return res.status(400).send("User does not authenticated for this operation")
}


module.exports = {dbConnection,sequelize,passwordHash,comparePWD,createToken,validateToken,userType}