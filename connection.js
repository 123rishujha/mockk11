const mongoose = require("mongoose");
require("dotenv").config();

// const connection = mongoose.connect(process.env.mongo);
const connection = mongoose.connect("mongodb+srv://rishu:jha@cluster0.txlyzmp.mongodb.net/mock?retryWrites=true&w=majority");

module.exports={
    connection
}
