import formal from "../assets/formal_wt.jpg" 
import party from '../assets/party.jpg'
import ethnic from '../assets/ethnicbois.jpeg' 
import mens from "../assets/mens.jpg"  
import womens from '../assets/womens.png' 
import gym from '../assets/gym.jpg' 
import shopimg from "../assets/shopimg.png"
import {useNavigate} from "react-router-dom"


export default  function Categories(){
    const navigate = useNavigate(); 
    return( 
        <> 
         
        <div className=" mb-32"> 
        <div className="flex items-center justify-center px-16 py-12 bg-blue-100 text-black">
        <div className="flex-shrink-0 w-1/2 flex justify-center">
            <img src={party} alt="Party Wear" className="rounded-2xl shadow-lg max-h-[500px] object-cover" />
        </div>

        <div className="w-1/2 flex flex-col items-start justify-center pl-12">
            <p className="font-semibold font-serif text-lg leading-relaxed mb-6"> Step into the Spotlight: Vogue Presents the Ultimate Party Wear Extravaganza. Ignite the Night with Glamour and Glitz. </p>
            <p className="font-semibold font-serif text-lg leading-relaxed text-gray-200"> From Opulent Gowns to Bespoke Suits, We Define the Pinnacle of Prestige. Every Detail Crafted to Perfection, Every Moment an Ode to Elegance.</p>
        </div>
        </div>

        <div className="flex w-full">
        <div className="w-1/2">
            <img src={shopimg} alt="Shop" className="w-full h-full object-cover" />
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center bg-[#c2cbba] text-center p-12">
            <div className="font-black text-2xl mb-6">Limited Edition - 2025</div>
            <div className="max-w-md text-lg leading-relaxed">
            Like an ode to the beauty of classical dance, an artistic passion as dear to Christian Dior as it is to Maria Grazia Chiuri, the House unveils the ballerinas from the Dior spring-summer 2024 ready-to-wear collection.
            </div>
        </div>
</div>
        </div> 


        <div className="h-full mb-32  flex items-center justify-center">
                 <div className="w-full h-full bg- -200 rounded-3xl flex flex-col items-center justify-center ">
                   <div className="text-[30px] mr-[900px] font-sans  text-[50px] p-4 ">Categories</div> 
                    <div className="mt-12 flex gap-4">
                    <div onClick={()=>{navigate("/mens")}}  className="bg-white  font-extrabold rounded-3xl  shadow-2xl shadow-black w-[500px] hover:w-[550px] hover:h-[350px] transition-all duration-500 cursor-pointer overflow-hidden w-[500px]  h-[300px]">
                    <img src={mens} className="overflow-hidden rounded-3xl opacity-80  " alt="" /> 
                    <div className="absolute z-20 mt-[-300px]  text-[30px]     text-gray-800 ml-12">Men's</div>
                    </div>
                    <div onClick={()=>{navigate("/womens")}} className="bg-white  font-extrabold rounded-3xl  shadow-2xl shadow-black cursor-pointer    hover:w-[850px] hover:h-[330px] transition-all duration-500 overflow-hidden w-[800px]  h-[300px]">
                    <img src={womens} className="overflow-hidden rounded-3xl opacity-80  " alt="" /> 
                    <div className="absolute z-20 mt-[-300px]  text-[30px]   text-gray-800 ml-12">Women's</div>
                    </div>
                </div>
                    <div className="mt-4 flex gap-4">
                    <div onClick={()=>{navigate("/ethnic")}} className="bg-white  font-extrabold cursor-pointer  rounded-3xl overflow-hidden  shadow-2xl shadow-black  hover:w-[850px] hover:h-[350px] transition-all duration-500 w-[800px]  h-[300px]">
                    <img src={ethnic} className="overflow-hidden rounded-3xl opacity-80  " alt="" /> 
                    <div className="absolute z-20 mt-[-300px]  text-[30px] text-black ml-12">Ethnic  </div>
                    </div>
                    <div onClick={()=>{navigate("/sports")}} className="bg-white  font-extrabold cursor-pointer rounded-3xl overflow-hidden shadow-2xl shadow-black w-[500px] hover:w-[550px] hover:h-[550px] transition-all duration-500  h-[300px]">
                    <img src={gym} className="overflow-hidden rounded-3xl opacity-80  " alt="" /> 
                    <div className="absolute z-20 mt-[-300px]  text-[30px] text-black ml-12">Gym and Sports  </div>
                    </div>
                     </div>
            </div> 
          </div> 
        </>
    )
}