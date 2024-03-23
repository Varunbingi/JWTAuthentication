const express=require('express');
const authRouter = require('./Router/authRoute');
const databaseConnection = require('./config/databaseConfig');
const cookieParser=require('cookie-parser')
const cors=require('cors');
const app=express();
app.use(cookieParser())
app.use(express.json())

//calling database inside app
databaseConnection();


app.use('/api/auth',authRouter)

app.use(cors({
    origin:[process.env.CLIENT_URL],
    Credential:true,
}))

app.use('/',(req,res)=>{
    return res.status(200).json({
        data:"Jwtauth server"
    })
});

module.exports=app;