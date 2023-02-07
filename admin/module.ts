import {users,book} from '../models/model';
const listOfAdmin = async ()=>{
    const userList = users.findAll({where : {user_type : true},attributes : ['username','email']})
    return userList
    
};

const addBook = async (bookData : any) =>{
    const bookCreated =await book.create(bookData);
    return bookCreated
}
module.exports = {listOfAdmin,addBook}