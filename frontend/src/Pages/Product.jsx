
import {useState ,  useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


export default  function ProductPage(){
    const {id } = useParams();  
    const username = localStorage.getItem("username") 
    const [message , setmessage] = useState("")
    const navigate = useNavigate();

    const [data , setdata] = useState({}) 
    useEffect(() => {
    async function getdata(){
        try{
            
            const response = await fetch("http://192.168.49.2:30201/get_product_id", {    
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"id"  :id}),
              }) ;
            const datar = await response.json()  
            setdata(datar)

        }
        catch(err){
            console.log(err) 
        }
    } 
    getdata() },  [ ]) 

    async function cartadder(){
        try{
            const response = await fetch("http://192.168.49.2:30202/add_to_cart" ,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"username"  :username , "item" : data._id}),
            }) 
            const message = await response.json()  
            setmessage(message.message)

            if (message && message.message) {
            setmessage(message.message);
            } else {
            setmessage("Item added to cart successfully!");
            }

            setTimeout(() => {
            navigate("/landing");
            }, 1200);
            } catch (err) {
                console.error("Error adding to cart:", err);
                setmessage("Failed to add to cart. Please try again.");
            }
    }



    return(
        <div className='w-screen border-t-2 border-black flex'> 
            <div className='w-1/2'><img className='w-full' src={data.img} alt="img here" /></div>
            <div className='w-1/2 flex flex-col items-left pl-24 bg-gray-200 justify-center'>
                <div className='font-bold text-[20px]'>{data.name}</div>
                <div className='w-[500px] my-12'>{data.description}</div>
                <div className='font-semibold text-[20px] mb-12 '>₹{data.price}</div> 
                <button onClick={cartadder} className='w-52 h-12 rounded-full bg-black text-white'>Add to Cart</button> 
                <div className='p-6'>{message}</div>
            </div>
             
        </div>
    )
}