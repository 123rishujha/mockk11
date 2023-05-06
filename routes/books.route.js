const express = require("express");

const bookRouter = express.Router();

//middelware
const  { authenticate } = require('../middlewares/authenticate.middle');
const { authoriseAdmin } = require("../middlewares/authoriseAdmin.middle");

//book model
const { BookModel } = require("../models/book.model");



// -----------------------------------------------

// bookRouter.use(authenticate);


//get
bookRouter.get("/",async(req,res)=>{
    let query = req.query;
    try{
        let data = await BookModel.find(query);
        res.status(200).send({success:true,result:data});
    }
    catch(err){
        res.status(400).send({success:false,err:`some wrong, ${err}`});
    }
});

//get single book
bookRouter.get("/:id",async(req,res)=>{
    const { id } = req.params;

    try{
        let data = await BookModel.find({_id:id});
        res.status(200).send({success:true,result:data});
    }
    catch(err){
        res.status(400).send({success:false,err:`some wrong, ${err}`});
    }
});


// bookRouter.use(authenticate);
bookRouter.use(authoriseAdmin);
//creat/post book
bookRouter.post("/",async(req,res)=>{
   const data = req.body;

   if(req.admin){
         try{
             const book = new BookModel(data);
             let res_book = await book.save();
             res.status(200).send({success:true,result:res_book});
        }
        catch(err){
             res.status(400).send({success:false,err:`some wrong, ${err}`});
        } 
   }else{
        res.status(400).send({success:false,err:`not authorize, ${err}`,from:"books page"});
   }
});

bookRouter.patch("/:id",async(req,res)=>{
    const data = req.body;
    const { id } = req.params;
    if(req.admin){
          try{
              let res_data = await BookModel.findByIdAndUpdate(id,data,{new:true});
              res.status(200).send({success:true,message:"updated successfully",data:res_data});
         }
         catch(err){
              res.status(400).send({success:false,err:`some wrong, ${err}`});
         } 
    }else{
         res.status(400).send({success:false,err:`not authorize, ${err}`,from:"books page"});
    }
 });

bookRouter.put("/:id",async(req,res)=>{
    const data = req.body;
    const { id } = req.params;
    if(req.admin){
          try{
              let res_data = await BookModel.findByIdAndUpdate(id,data,{new:true});
              res.status(200).send({success:true,message:"update",data:res_data});
         }
         catch(err){
              res.status(400).send({success:false,err:`some wrong, ${err}`});
         } 
    }else{
         res.status(400).send({success:false,err:`not authorize, ${err}`,from:"books page"});
    }
 });

bookRouter.delete("/:id",async(req,res)=>{
    const { id } = req.params;
    if(req.admin){
          try{
              let res_data = await BookModel.findByIdAndDelete(id);
              res.send({success:true,message:"delete",data:res_data});
         }
         catch(err){
              res.status(400).send({success:false,err:`some wrong from catch delete, ${err}`});
         } 
    }else{
         res.status(400).send({success:false,err:`not authorize, ${err}`,from:"books page"});
    }
 });


module.exports={
    bookRouter
}