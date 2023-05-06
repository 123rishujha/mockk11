const jwt = require("jsonwebtoken");


const authenticate = (req,res,next) =>{
    const token = req.headers?.authorization;

    if(token){
        try{
            const decoded = jwt.verify(token,"rishu");
            console.log(decoded.userId);
            req.userId=decoded.userId;
            next();
        }
        catch(err){
            res.status(400).send({success:false,message:"not authorize for this operation",err:err});
        }

    }else{
        res.status(400).send({success:false,message:"not authorize for this operation"});
    }

}

module.exports={
    authenticate
}