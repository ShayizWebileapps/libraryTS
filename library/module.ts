import {Op} from 'sequelize'
const {sequelize} = require('../utils')
import  {book,theme,author} from  "../models/model";

const getBook = async () => {
    try {
        const bookData = await book.findAll({
            include:[
                {
                model : theme,
                as : "theme"
                // on :{
                //     col1 : sequelize.where(sequelize.col("book.themeid"),"=",sequelize.col("theme.themeid"))
                // },
                // attributes : ["themename"]
            },
            {
                model : author,
                as :"author"
                // on :{
                //     col1 : sequelize.where(sequelize.col("book.authorid"),"=",sequelize.col("author.authorid"))
                // },
                // attributes : ["themename"]
            }
        ]
        });
        return bookData;
    } catch (error) {
        console.log("Error in function")
        console.log(error)
        return error;
        
    }
}
const getBookById = async(id : number)=>{
    try {
        const data = book.findByPk(id,{include:[
            {
            model : theme,
            on :{
                col1 : sequelize.where(sequelize.col("book.themeid"),"=",sequelize.col("theme.themeid"))
            },
            // attributes : ["themename"]
        },
        {
            model : author,
            on :{
                col1 : sequelize.where(sequelize.col("book.authorid"),"=",sequelize.col("author.authorid"))
            },
            // attributes : ["themename"]
        }
    ]});
        return data
    } catch (error) {
        console.log('error in find by pk function')
    }
}
const available= async(id?:number) => {
    try {
        if (id){
            const data = await book.findByPk(id)
            // console.log(data)
            return data
        
        }
        else{
            const data = await book.findAll({where : {
                availability : {
                    [Op.gte] : 0
                }
            }})
            // console.log(data)
            return data
        }
       
    } catch (error) {
        console.log("There is an issue")
    }
    
}

module.exports = {getBook,getBookById,available}



