const express = require("express");
require("dotenv").config();
const cors = require('cors');
const { connection } = require("./connection.js");


//files
const { userRouter } = require("./routes/users.route.js");
const { bookRouter } = require("./routes/books.route.js");

const app = express();


app.use(express.json());
app.use(cors());

app.use("/api",userRouter);
app.use("/api/books",bookRouter);



const port = 8080;

app.listen(port,async()=>{
    try{
        await connection;
        console.log("connected to database");
    }
    catch(err){
        console.log("not connected");
        console.log(err);
    }
    console.log(`running on port ${port}`);
})
