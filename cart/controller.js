const { model } = require("mongoose");
const  Cart  = require("./models.js")
const { MongoClient ,ObjectId  } = require('mongodb'); 
const uri = `mongodb://${process.env.USER_NAME}:${process.env.USER_PWD}@${process.env.DB_URL}`  
// const uri = `mongodb+srv://mmuralikrishnacse21_db_user:M%40ithri%4012@cluster0.hf6hczw.mongodb.net/`

const client = new MongoClient(uri, { });

 
const get_cart =  async(req , res)=>{
    try{
        const {username} = req.body  
        const db= client.db("CC_project") ; 
        const collection = db.collection('cart') ;  

        const items = await collection.find({username : username}).toArray() 
        res.json(items[0].items)

    }
    catch(err) {
        console.log(err)
    }
}



const create_cart =  async(req , res)=>{
    try{
        const {username} = req.body ; 
        const db= client.db("CC_project") ; 
        const collection = db.collection('cart') ;
        const result = await collection.insertOne({username : username , items :{}}) 
        return res.status(200).send({message : "New Cart Created Successfully"})
        
     }
     catch(err){
        console.log(err)
     }
} 



const add_to_cart = async(req ,res)=>{
    try{
        const {username , item } = req.body
        const db= client.db("CC_project") ; 
        const collection = db.collection('cart') ; 
     

        let cart = await collection.findOne({username : username}) 
        if (!cart) {
            cart = {
              username,
              items: {}
            };
          }
      
          if (cart.items[item]) {
            cart.items[item]++;
          } else {
            cart.items[item] = 1;
          }

          await collection.updateOne({ username : username }, { $set: cart }, { upsert: true });
        

        return res.status(200).send({message : "Added to the cart" })
    
        }
        catch(err){
            console.log(err)
            res.status(500).send("Error adding the product to the cart")
        }
}

const remove_from_cart = async(req ,res)=>{
    try{
        const {username , item } = req.body
        const db= client.db("CC_project") ; 
        const collection = db.collection('cart') ; 
     

        let cart = await collection.findOne({username : username}) 
        if (!cart) {
            cart = {
              username,
              items: {}
            };
          }
      
          if (cart.items[item]) {
            cart.items[item]--;
          } else {
            cart.items[item] = 0;
          }

          await collection.updateOne({ username : username }, { $set: cart }, { upsert: true });
        

        return res.status(200).send({message :"Product removed from the cart"})
    
        }
        catch(err){
            console.log(err)
            res.status(500).send("Error adding the product to the cart")
        }
}

module.exports = { create_cart , add_to_cart , remove_from_cart  , get_cart}