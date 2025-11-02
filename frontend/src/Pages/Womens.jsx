import { useState , useEffect } from "react"; 
import ProductCard from "../Components/ProductCard";

export default function Womens(){
    const [data , setdata] = useState([{name : "null as of now"}]) 
    useEffect(() => {
    async function getdata(){
        try{
            const response = await fetch("http://192.168.49.2:30201/filter_category" , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({  category : "Womens" }),
                
              }) ;
            const datar = await response.json() 
            setdata(datar)
        }
        catch(err){
            console.log(err) 
        }
    } 
    getdata() },  [ ])
    return(
        <div>
            <> 
            <div className="bg-white flex flex-col  items-center  h-fit   ">
                <div className="font- mt-12 mr-[900px] text-[30px]">Categories / Women's Wear</div>   
                <div className="mt-24 grid grid-cols-4 gap-12"> 
                 {data.map((obj)=>{return(<ProductCard name={obj.name} price ={obj.price} img ={obj.img} id={obj._id} />)})}  
               
                </div>
                <div className="w-52 h-12 border-2 mt-12 flex mb-12 items-center border-black/30 cursor-pointer justify-center rounded-full">View All</div>
            </div>
        </>
        </div>
    )
}