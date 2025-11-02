const { model } = require("mongoose");
const  Product  = require("./models.js")
const { MongoClient ,ObjectId  } = require('mongodb'); 
const uri = `mongodb://${process.env.USER_NAME}:${process.env.USER_PWD}@${process.env.DB_URL}`  
// const uri = `mongodb+srv://mmuralikrishnacse21_db_user:M%40ithri%4012@cluster0.hf6hczw.mongodb.net/`

const client = new MongoClient(uri, { });


const addprod =  async(req ,res)=>{
    try{
    const {name , img , description , price , category , stock_quantity} = req.body
    const db= client.db("CC_project") ; 
    const collection = db.collection('products') ; 
 
    const Prod = new Product({name , img , description , price , category , stock_quantity }) ;  
    const result = await collection.insertOne(Prod) ; 
    return res.status(200).send("Product added successfully")

    }
    catch(err){
        res.status(500).send("Error adding the product")
    }
    
}
 
const get_products =  async(req , res)=>{
    try{
        const db = client.db("CC_project") ; 
        const collection = db.collection('products')  ; 

        const data = await collection.find({}).toArray() ; 
        res.json(data)
    } 
    catch(err){
        console.log(err) ; 
        res.status(500).send("Error retrieving data")
    }
}



const get_product_id = async(req , res)=>{
    const userId = req.body.id 
    const userid = userId.toString()
    try{
        const db = client.db("CC_project") ; 
        const collection = db.collection('products')  ; 
        const data = await collection.findOne({ _id: new ObjectId(userid) } ); 
        res.json(data)
    } 
    catch(err){
        console.log(err) ; 
        res.status(500).send("Error retrieving data")
    }
} 

const filter_category =  async(req , res)=>{
    try{
        const db = client.db("CC_project") ; 
        const collection = db.collection('products')  ; 
        const {category} = req.body
        const data = await collection.find({category  }).toArray() ; 
        res.json(data)
    } 
    catch(err){
        console.log(err) ; 
        res.status(500).send("Error retrieving data")
    }
}

const get_product_by_id = async (req, res) => {
    try {
      const { id } = req.body; // or req.params.id if sent via URL param
  
      if (!id) {
        return res.status(400).send({ message: "Product ID is required" });
      }
  
      const db = client.db("CC_project");
      const productCollection = db.collection("products");
  
      const product = await productCollection.findOne({ _id: new ObjectId(id) });
  
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
  
      return res.status(200).send(product);
    } catch (err) {
      console.error("Error fetching product by ID:", err);
      res.status(500).send({ message: "Error fetching product" });
    }
  };

module.exports = {  addprod , get_products , get_product_id , filter_category, get_product_by_id  }