require('dotenv').config();
const PORT= 5004;


const app=require('./app');


app.listen(PORT,()=>{
    console.log(`server runiing at ${PORT}`);
})