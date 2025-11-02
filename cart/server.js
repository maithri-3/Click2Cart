const express = require("express") 
const { MongoClient ,ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const cors = require('cors');  
const router = require("./routes.js")



const app = express() ; 
app.use(cors()) ;
app.use(bodyParser.json());
const uri = `mongodb://${process.env.USER_NAME}:${process.env.USER_PWD}@${process.env.DB_URL}`
// const uri = `mongodb+srv://mmuralikrishnacse21_db_user:M%40ithri%4012@cluster0.hf6hczw.mongodb.net/`

const client = new MongoClient(uri, { });


async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
}
connect() ; 


app.use('/', router);


app.listen(5003 , ()=>{
    console.log("server up and running on the port 5003")
})