const mongoose=require('mongoose');

const MONGODB_URL=process.env.MONGODB_URL;
const databaseConnection=()=>{
    mongoose.connect(MONGODB_URL).then((conn)=>{
        console.log(`monogodb connected to ${conn.connection.host}`)
    }).catch((e)=>console.log(e));
}

module.exports=databaseConnection;