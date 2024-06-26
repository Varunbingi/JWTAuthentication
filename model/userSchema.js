const mongoose=require('mongoose');

const {Schema}=mongoose;
const JWT=require('jsonwebtoken');
const bcrypt=require('bcrypt')

const userSchema=new Schema({
    name:{
        type: String,
        required: [true,'User name is required'],  // validations
        maxLength: [50,'Name must be less than 50 char'],
        minLength: [5,"name must be at leatest 5 char"],
        trim:true,

    },
    email:{
        type:String,
        required:[true,"user eamil is required"],
        lowercase:true,
        unique:[true, "Already registered email"],

    },
    password:{
        type:String,
        select: false,
    },
    conformPassword:{
        type:String,
    },
    forgotPasswordToken:{
        type:String,
    },
    forgotPasswordExpiryDate:{
        type:String,
    },
    
},{
    timestamps:true,
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password= await bcrypt.hash(this.password,10);
    
    return next();
})
userSchema.methods={
    jwtToken(){
       return JWT.sign({
            id:this._id,
            email:this.email
        
        },
        process.env.SECRET,
        {expiresIn:'24h'}
        )
    }
}

const userModel=mongoose.model('user',userSchema);

module.exports=userModel;