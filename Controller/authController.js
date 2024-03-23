
const userModel=require('../model/userSchema');
const emailValidator=require('email-validator');
const bycrypt=require('bcrypt')

const signup=async(req,res)=>{
    const {name,email,password,conformPassword}=req.body;
    console.log(name,email,password,conformPassword);
    try{
        if(!name||!email||!password||!conformPassword){
            return res.status(400).json({
                suceess:false,
                message:"Every field is requird",
            })
        }
        var validEmail=emailValidator.validate(email);
        if(!validEmail){
            return res.status(400).json({
                suceess:false,
                message:"Please provide valid email",
            })
        }
        if(password!==conformPassword){
            return res.status(400).json({
                suceess:false,
                message:"password and conform password doesn't match",
            })
        }
        const userInfo=userModel(req.body);
        const result= await userInfo.save();
        return res.status(200).json({
            suceess:true,
            data:result
        })
    }
    catch(e){
        if(e.code===11000){
           return res.status(400).json({
                suceess:false,
                message:"Account alredy exists",
            })
        }
       return res.status(400).json({
            suceess:false,
            message:e.message,
        })
    }
    
}
const signin=async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json({
            suceess:false,
            message:"Every filed is required",
        })
    }
    try{
        const user= await userModel.findOne({
            email
        }).select('+password');
    
    if(!user|| !(await bycrypt.compare(password,user.password) )){
        return res.status(400).json({
            suceess:false,
            message:"Invalid credentials",
        })
    }
    const token=user.jwtToken();
    user.password=undefined;
    const cookieOptions={
        maxAge:24*60*60*1000,
        httpOnly: true,
    }
    res.cookie("token",token,cookieOptions);
    res.status(200).json({
        suceess:true,
        data:user,

    })
}
    catch(e){
        return res.status(400).json({
            suceess:false,
            message: e.message
        })
    }
}
const getUser=async(req,res)=>{
    const userId=req.user.id;
    try{
        const user=await userModel.findById(userId);
        return res.status(200).json({
            success:true,
            data:user,
        }) 
    }
    catch(e){
        res.status(400).json({
            suceess:false,
            message: e.message
        
        })
    }
    
}
const logout=(req,res)=>{
    try{
        const cookieOptions={
            maxAge:new Date,
            httpOnly: true,
        }
        res.cookie("token",null,cookieOptions);
        res.status(200).json({
            suceess:true,
            message:"logged out"
    
        })
    }
    catch(e){
       res.status(400).json({
        suceess:false,
        message: e.message
    
       })
    }
}

module.exports={
    signup,
    signin,getUser,logout
}