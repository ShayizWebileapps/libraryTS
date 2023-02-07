import express, { Express, Request, Response } from 'express';
import { ppid } from 'process';
import { Utils } from 'sequelize';
const cookieParser = require("cookie-parser");
// import { ppid } from 'process';
const {dbConnection,sequelize} = require('./utils')

//const library = require('./library/route')

const admin = require('./admin/routes')
const library = require('./library/route')
const client = require('./clients/route')


const app : Express = express();
app.use(express.json());
app.use(cookieParser());
app.use('/admin',admin);
app.use('/library',library);
app.use('/client',client);
//app.use('/library',library)
app.get('/',(req : Request,res : Response)=>{
    res.send("Hello");
});

dbConnection();
(async () => await sequelize.sync())();
app.listen(5000,() =>{
    console.log("Server is listening")
})