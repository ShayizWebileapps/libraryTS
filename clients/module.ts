//import {sequelize} from '../utils';
import e from 'express'
import {users} from '../models/model'

const userCreate = async (uName:string,PWD:string,mail:string,UType : boolean) =>{
    try {
        const user = await users.create({username : uName,password : PWD,email : mail,user_type : UType})
        return user
    } catch (error) {
        console.log(error)
    }

}
const userLogin =async(userName :string)=>{
    const user = await users.findOne({where : {username : userName}});
    return user;
}






module.exports = {userCreate,userLogin}
