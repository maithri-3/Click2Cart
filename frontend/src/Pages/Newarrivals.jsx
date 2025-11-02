import ProductCard from "../Components/ProductCard";
import { useState , useEffect } from "react"


export default function Newarrivals(){
    const [data , setdata] = useState([{name : "null as of now"}]) 
    useEffect(() => {
    async function getdata(){
        try{
            const response = await fetch("http://192.168.49.2:30201/get_products") ;
            const datar = await response.json() 
            setdata(datar)
        }
        catch(err){
            console.log(err) 
        }
    } 
    getdata() },  [ ])
    return(
        <> 
            <div className="bg-white flex flex-col  items-center  h-fit   ">
                <div className="font-black mt-12 text-[40px]">Products</div>   
                <div className="mt-24 grid grid-cols-4 gap-12"> 
                 {data.map((obj)=>{return(<ProductCard name={obj.name} price ={obj.price} img ={obj.img} id={obj._id} />)})}  
               
                </div>
                <div className="w-52 h-12 border-2 mt-12 flex mb-12 items-center border-black/30 cursor-pointer justify-center rounded-full">View All</div>
            </div>
        </>
    )
}