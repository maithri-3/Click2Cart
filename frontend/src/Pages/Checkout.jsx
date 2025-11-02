import Navbar from "../Components/Navbar"; 
import { useState , useEffect } from "react"; 
import {useNavigate} from "react-router-dom"

export default function Checkout(){

    const [products, setProducts] = useState([]); 
    const [loaded , setloaded] = useState(false) ; 
    const [total , settotal] = useState(0) ;  
    const username = localStorage.getItem("username") 
    const [freqobj, setobj] = useState({})
    const navigate = useNavigate(); 


    const [fname , setfname] = useState("")   
    const[cardn , setcardn ] = useState("")
    const[expd , setexpd ] = useState("") 
    const[expm , setexpm] = useState("") 
    const[cvv  , setcvv] = useState("") 

    const [shippingname , setsname] = useState("")   
    const[address , setaddress ] = useState("")
    const[city , setcity ] = useState("") 
    const[zip , setzip] = useState("") 
    const[country  , setcountry] = useState("") 
    const[orders , setorders] = useState({})

    const [message , setmessage] = useState("")
    
    async function addorder() {
      const requiredFields = { username, fname, cardn, expd, expm, cvv, shippingname, address, city, zip, country, orders };
      for (const [key, value] of Object.entries(requiredFields)) {
        if (value === null || value === undefined || value === "") {
          setmessage(`None of the fields must be empty.`);
          console.error(`Missing field: ${key}`);
          return;
        }
      }
    
      try {
        const response = await fetch("http://192.168.49.2:30203/add_order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(requiredFields),
        });
    
        const reply = await response.json();
        setmessage(reply.message);
        console.log(reply.message);

        if (reply && reply.message) {
          setmessage(reply.message);
        } else {
          setmessage("Order placed successfully!");
        }

        setTimeout(() => {
          navigate("/orders");
        }, 1200);
          } catch (err) {
        console.error("Error adding order:", err);
        setmessage("Error: Unable to add order. Please try again later.");
      }
    }
    



    useEffect(() => {
        const fetchProducts = async () => {

          try {
            // API endpoint 1: Get product objectIds for the user
            const response = await fetch('http://192.168.49.2:30202/get_cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username : username}),
              });
            const productObjectIds = await response.json() ; 
            console.log(productObjectIds)  
             

    
            // // Fetch product details for each objectId (consider using Promise.all) 
               const arr = [] ; 
               let sumtotal = 0  

               let frequency = {};
               frequency = productObjectIds ;
               setobj(frequency)
              
          
            for(const key in frequency){
                const response2 = await  fetch('http://192.168.49.2:30201/get_product_id', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({id : key }),
                })
                const ar =  await response2.json()
                sumtotal = sumtotal+  ar.price * frequency[key]
                arr.push(ar)  
              
              } 

            setProducts(arr) 
            console.log(arr) 

            let result = {} 
            for(let i =0 ; i< arr.length ; i++){
              let name= arr[i].name ; 
              let quant = frequency[arr[i]._id] 
              result[i] = {name : name , quantity : quant}
            } 
            console.log(result) 
            setorders(result)
            settotal(sumtotal) 
            setloaded(true)  
        
          } catch (error) {
            console.log(error);
          }  
        };
    
        fetchProducts();
      }, []);




   return (
  <>
    <div className="flex w-screen h-fit ">
      <div className="w-2/3 flex flex-col p-32 justify-center">
        <div className="font-bold mb-8 mt-[-80px] text-[30px]">Checkout</div>

        <div className="bg-slate-200 w-[500px] rounded-xl p-12">
          <div className="font-semibold text-[20px] my-4">Card info</div>

          <label htmlFor="" className="text-gray-600 my-4">Full name</label> <br />
          <input
            value={fname}
            onChange={(e) => setfname(e.target.value)}
            className="h-12 w-[400px] my-4 rounded-xl px-4"
            type="text"
            placeholder="Enter name on card"
          /> <br />

          <label htmlFor="" className="text-gray-600 my-4">Card number</label> <br />
          <input
            value={cardn}
            onChange={(e) => setcardn(e.target.value)}
            className="h-12 w-[400px] mt-4 rounded-xl px-4"
            type="text"
            placeholder="Enter 16-digit card number"
          />

          <div className="flex flex-col gap-4">
            <div className="m-4 text-gray-600 mb-0">
              Exp Month <span className="ml-[200px]">Exp Year</span>
            </div>
            <br />
            <div className="flex gap-4">
              <input
                value={expd}
                onChange={(e) => setexpd(e.target.value)}
                className="h-12 w-[190px] mt-[-50px] rounded-xl px-4"
                type="text"
                placeholder="MM"
              />
              <input
                value={expm}
                onChange={(e) => setexpm(e.target.value)}
                className="h-12 w-[190px] mt-[-50px] rounded-xl px-4"
                type="text"
                placeholder="YY"
              />
            </div>
          </div>

          <label htmlFor="" className="text-gray-600 m-4 mt-32">CVV</label> <br />
          <input
            value={cvv}
            onChange={(e) => setcvv(e.target.value)}
            className="h-12 w-[400px] mt-4 rounded-xl px-4"
            type="password"
            placeholder="Enter CVV"
          />
        </div>
        
        <div className="bg-slate-200 w-[500px] rounded-xl mt-12 p-12">
          <div className="font-semibold text-[20px] my-4">Billing info</div>

          <label htmlFor="" className="text-gray-600 my-4">Full name</label> <br />
          <input
            value={shippingname}
            onChange={(e) => setsname(e.target.value)}
            className="h-12 w-[400px] my-4 rounded-xl px-4"
            type="text"
            placeholder="Enter billing full name"
          /> <br />

          <label htmlFor="" className="text-gray-600 my-4">Shipping Address</label> <br />
          <input
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            className="h-12 w-[400px] mt-4 rounded-xl px-4"
            type="text"
            placeholder="Enter street address"
          />

          <div className="flex flex-col gap-4">
            <div className="m-4 text-gray-600 mb-0">
              CITY <span className="ml-[200px]">ZIP CODE</span>
            </div>
            <br />
            <div className="flex gap-4">
              <input
                value={city}
                onChange={(e) => setcity(e.target.value)}
                className="h-12 w-[190px] mt-[-50px] rounded-xl px-4"
                type="text"
                placeholder="Enter city"
              />
              <input
                value={zip}
                onChange={(e) => setzip(e.target.value)}
                className="h-12 w-[190px] mt-[-50px] rounded-xl px-4"
                type="text"
                placeholder="Enter ZIP code"
              />
            </div>
          </div>

          <label htmlFor="" className="text-gray-600 m-4 mt-32">Country</label> <br />
          <input
            value={country}
            onChange={(e) => setcountry(e.target.value)}
            className="h-12 w-[400px] mt-4 rounded-xl px-4"
            type="text"
            placeholder="Enter country"
          />
        </div>
      </div>
      <div className="w-1/3 bg-gray-200 p-12 rounded-xl">
        <div className="font-bold mt-16 text-[20px]">Order summary</div>
        <div className="p-4 rounded-xl mt-12 bg-white">
          {products.map((obj) => (
            <div
              key={obj._id}
              className="text-gray-500 text-[15px] w-[360px]"
            >
              {obj.name}
              <span className="absolute left-[1370px]">x {freqobj[obj._id]}</span>
            </div>
          ))}
        </div>
        <div className="font-semibold ml-64 my-6">Total : ₹ {total}</div>
        <div
          onClick={addorder}
          className="bg-black text-white p-4 rounded-xl w-[200px] cursor-pointer"
        >
          Place order →
        </div>
        <div className="mt-8">{message}</div>
      </div>
    </div>
  </>
)
}