const express=require('express');
const authRouter = require('./Router/authRoute');
const databaseConnection = require('./config/databaseConfig');

const app=express();
app.use(express.json())

//calling database inside app
databaseConnection();


app.use('/api/auth',authRouter)



app.use('/',(req,res)=>{
    return res.status(200).json({
        data:"Jwtauth server"
    })
});

module.exports=app;