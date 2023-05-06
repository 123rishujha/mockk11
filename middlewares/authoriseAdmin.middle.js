const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");


const getUser = async (id) =>{
    try{
        let user = await UserModel.find({_id:id});
        // console.log("getuser function ", user);
        // console.log("called");
        return {success:true,user:user[0]};
    }
    catch(err){
        return {success:false};
    }
}


const authoriseAdmin = async (req,res,next) =>{
    const token = req.headers?.authorization;
    console.log(token);
    if(token){
        try{
            const decoded = jwt.verify(token,"rishu");
            console.log("decoded",decoded);
            let x = await getUser(decoded.userId);
            console.log("x",x);
            if(x.success){
                if(x.user.isAdmin){
                    req.admin = true;
                    next();
                }else{
                    res.status(400).send({success:false,message:"not authorize for this operation",err:err});
                }
            }else{
                res.status(400).send({success:false,message:"not authorize for this operation",err:err});
            }
        }
        catch(err){
            res.status(400).send({success:false,message:"not authorize for this operation",from:"catch"});
        }

    }else{
        res.status(400).send({success:false,message:"not authorize for this operation from authorise middle"});
    }

}


module.exports={
    authoriseAdmin
}