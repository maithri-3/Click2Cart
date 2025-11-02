const { model } = require("mongoose");
const  {Order , Payment}  = require("./models.js")
const { MongoClient ,ObjectId  } = require('mongodb'); 
const uri = `mongodb://${process.env.USER_NAME}:${process.env.USER_PWD}@${process.env.DB_URL}`  
// const uri = `mongodb+srv://mmuralikrishnacse21_db_user:M%40ithri%4012@cluster0.hf6hczw.mongodb.net/`

const client = new MongoClient(uri, { });

const add_order =  async(req , res)=>{
    try{
        const { username , fname , cardn , expd , expm , cvv , shippingname , address , city ,zip  , country , orders } = req.body
        const db= client.db("CC_project") ; 
        const collection = db.collection('orders') ; 
     
        const order = new Order({username ,fname , cardn , expd , expm , cvv , shippingname , address , city ,zip  , country ,orders}) ;  
        const result = await collection.insertOne(order) ; 
        const cartcollection = db.collection("cart") 
        try{
            const cart = await cartcollection.findOneAndUpdate(
                {username : username } ,
                { $set: { items: {} } } 
            )
        }
        catch(err){
            return res.status(404).send({message: "Cart not found error"})
        }
        return res.status(200).send({message : "Order added successfully"})
    
        }
        catch(err){
            console.log(err)
            res.status(500).send("Error adding order")
        }
}

    const delete_order = async (req, res) => {
        try {
        const { id } = req.body;
    
        if (!id) {
            return res.status(400).send({ message: "Order ID is required" });
        }
    
        const db = client.db("CC_project");
        const collection = db.collection("orders");
    
        // Attempt to delete the order with given _id
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "Order not found" });
        }
    
        return res.status(200).send({ message: "Order deleted successfully" });
        } catch (err) {
        console.error("Error deleting order:", err);
        res.status(500).send({ message: "Error deleting order" });
        }
    };

  
const get_orders = async(req , res)=>{
    try{

        const db= client.db("CC_project") ; 
        const collection = db.collection('orders') ; 
        const {username} = req.body ; 
        const data = await collection.find({username}).toArray()
        res.json(data)
    
        }
        catch(err){
            console.log(err)
            res.status(500).send("Error getting order")
        }
}
//payment routes 

const add_payment = async(req , res)=>{
    try{
        const {username , Order , total_price ,Payment_method ,Created_at , status , transaction_id } = req.body
        const db= client.db("CC_project") ; 
        const collection = db.collection('payments') ; 
     
        const payment = new Payment({username , Order , total_price ,Payment_method ,Created_at , status , transaction_id  }) ;  
        const result = await collection.insertOne(payment) ; 
        return res.status(200).send("Payment done successfully")
    
        }
        catch(err){
            console.log(err)
            res.status(500).send("Error in the payments page")
        }
}

const remove_from_cart = async (req, res) => {
    try {
      const { username, itemId } = req.body;
  
      if (!username || !itemId) {
        return res.status(400).send({ message: "Missing username or itemId" });
      }
  
      const db = client.db("CC_project");
      const cartcollection = db.collection("cart");
  
      const result = await cartcollection.updateOne(
        { username },
        { $unset: { [`items.${itemId}`]: "" } }
      );
  
      if (result.modifiedCount === 0) {
        return res
          .status(404)
          .send({ message: "Item not found in cart or cart not found" });
      }
  
      return res
        .status(200)
        .send({ message: "Item removed from cart successfully" });
    } catch (err) {
      console.error("Error removing item from cart:", err);
      return res.status(500).send({ message: "Error removing item from cart" });
    }
  };
  

 

module.exports = { add_order ,get_orders ,add_payment, remove_from_cart, delete_order }