const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//files
const { UserModel } = require("../models/user.model");



const userRouter = express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,password,isAdmin} = req.body;
    
    try{
        const findUser = await UserModel.findOne({email:email});
        if(findUser){
            res.status(400).send({success:false,err:`user already exist`});
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(hash){
                    const user = new UserModel({name,email,password:hash,isAdmin})
                    let user_res = await user.save();
                    res.status(200).send({success:true,data:user_res});
                }else{
                    res.status(400).send({success:false,err:`something went wrong, ${err}`})
                }
            })
        }
        
    }
    catch(err){
        console.log(err);
        res.status(400).send({success:false,message:`some thing wrong ${err}`})
    }
});


userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const findUser = await UserModel.findOne({email:email});
        if(findUser){
            bcrypt.compare(password,findUser.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({"userId":findUser._id},"rishu");
                    res.status(200).send({success:true,message:"Login successful",token:token});
                }else{
                    res.status(400).send({success:false,err:`wrong credentials`})
                }
                
            });
        }else{
            res.status(400).send({success:false,err:`wrong credentials`})
        }
    }
    catch(err){
        res.status(400).send({success:false,err:"some went wrong"})
    }
});

module.exports={
    userRouter
}