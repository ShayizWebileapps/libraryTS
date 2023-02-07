import { CreationOptional, DataTypes,
     InferAttributes, InferCreationAttributes
     , Model, Optional } from 'sequelize';
const {sequelize} = require('../utils')


export  class theme extends Model<InferAttributes<theme>,InferCreationAttributes<theme>>{
    declare themeid : CreationOptional<number>;
    declare themename : string;
}
theme.init({
    themeid : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    themename :  {
        type: new DataTypes.STRING(50),
        allowNull: false
    },
   },
    {
        sequelize,
        tableName : 'theme',
        freezeTableName : true,
        timestamps : false
    }

);

export  class author extends Model<InferAttributes<author>,InferCreationAttributes<author>>{
    declare authorid : CreationOptional<number>;
    declare authorname : string;
    declare authorplace : string;
}
author.init({
    authorid : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    authorname :  {
        type: new DataTypes.STRING(50),
        allowNull: false
    },
    authorplace : {
        type: new DataTypes.STRING(50),
        allowNull: true
    }
   },
    {
        sequelize,
        tableName : 'author',
        freezeTableName : true,
        timestamps : false
    }

);

export  class book extends Model<InferAttributes<book>,InferCreationAttributes<book>>{
    declare bookid : CreationOptional<number>;
    declare bookname : string;
    declare publisheddate : Date;
    declare authorid : number;
    declare themeid : number;
    declare availability : number;
}


book.init({
    bookid : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    bookname :  {
        type: new DataTypes.STRING(50),
        allowNull: false
    },
    publisheddate:{
        type : DataTypes.DATE
    },
    authorid : {
        type : DataTypes.INTEGER,
        references: {
            model: author,
            key: "authorid",
          }
    },
    themeid : {
        type : DataTypes.INTEGER,
        references: {
            model: theme,
            key: "themeid",
          }
    },
    availability : {
        type : DataTypes.INTEGER
    }},
    {
        sequelize,
        tableName : 'book',
        freezeTableName : true,
        timestamps : false
    }

);

book.hasOne(theme,{
    foreignKey : 'themeid',

});
book.hasOne(author,{
    foreignKey : 'authorid',

});

export  class users extends Model<InferAttributes<users>,InferCreationAttributes<users>>{
    declare user_id : CreationOptional<number>;
    declare username : string;
    declare password : string;
    declare email : string
    declare user_type : boolean;
    declare last_login : CreationOptional<Date>


}
users.init({
    user_id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    username : {
        type : DataTypes.STRING(50),
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    user_type : {
        type : DataTypes.BOOLEAN,
        allowNull : false
    },
    
    last_login : {
        type : DataTypes.DATE,
    }
},{
    sequelize,
    tableName : 'users',
    freezeTableName : true,

});
//checking purpose

// (async () =>{ 
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
//     await sequelize.sync()
//     try {
//         const bookData = await users.findAll();
//         console.log(bookData)
//     } catch (error) {
//         console.log("Error in function")
//         console.log(error)
        
        
//     }
// })();



