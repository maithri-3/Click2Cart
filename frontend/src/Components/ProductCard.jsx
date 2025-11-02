import { useState } from "react"
import { useNavigate } from 'react-router-dom';


export default function ProductCard(props){

    const navigate = useNavigate();
    function cardclicker(){
        navigate(`/product/${props.id}`) }
    
     
    return( 
        <div onClick={cardclicker} className="flex flex-col cursor-pointer"> 
            <div className="w-72  overflow-hidden h-72 bg-gray-200 rounded-xl"><img className=" w-full" src={props.img}   /></div> 
            <div className="m-4 w-64 font-bold">{props.name}</div>
            <div className="m-4  my-0">  </div>
            <div className="flex"> <div className="m-4  font-bold text-[20px] my-0">₹ {props.price} </div><div className="h-6 w-16 flex items-center text-[12ffpx] justify-center rounded-2xl  text-red-400 bg-red-200">-20%</div></div>
        </div>
    )
}