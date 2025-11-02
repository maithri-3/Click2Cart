import { useState } from "react";

export default function CartCard(props) {
  const [counter, setCounter] = useState(props.freq);
  const username = localStorage.getItem("username");
  const [message , setmessage] = useState("")

async function cartAdder() {
    try {
      const productResponse = await fetch("http://192.168.49.2:30201/get_product_id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: props.id }),
      });
  
      const product = await productResponse.json();
      console.log(product);
  
      if (counter >= product.stock_quantity) {
        setmessage(`Only ${product.stock_quantity} item(s) in stock!`);
        return; 
      }
  
      const addResponse = await fetch("http://192.168.49.2:30202/add_to_cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, item: props.id }),
      });
  
      const reply = await addResponse.json();
      console.log("Add to cart:", reply);
  
      if (addResponse.ok) {
        setCounter(counter + 1);
      } else {
        console.log(reply.message || "Error adding to cart.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  }
  
  async function cartRemover() {
    if (counter <= 1) return;
    try {
      const response = await fetch("http://192.168.49.2:30202/remove_from_cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, item: props.id }),
      });
      const reply = await response.json();
      console.log("Remove from cart:", reply);
      setCounter(counter - 1);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  }

  async function removeItemCompletely() {
    if (props.onRemove) props.onRemove(props.id);
  }

  return (
    <div className="w-[1200px] overflow-hidden flex bg-gray-200 h-32 rounded-xl shadow-sm">
      <div>
        <img className="h-28 w-28 object-cover rounded-l-xl" src={props.img} alt={props.name} />
      </div>

      <div className="w-[380px] m-4 text-left font-bold text-[15px]">
        {props.name}
        <br />
        <span className="font-normal text-[10px]">{props.desc}</span>
      </div>
      <div className="mt-8">{message}</div>

      <div className="w-1/6 m-4 ml-12 mt-6 font-bold">
        Each <br />
        <span className="font-normal">₹ {props.price}</span>
      </div>

      <div className="w-1/6 m-8">
        <div className="h-12 w-32 border-2 border-black/30 text-gray-700 flex rounded-xl">
          <div
            onClick={() => cartRemover()}
            className="w-1/3 flex text-[30px] cursor-pointer items-center justify-center"
          >
            -
          </div>
          <div className="w-1/3 flex text-[20px] items-center justify-center bg-white">
            {counter}
          </div>
          <div
            onClick={() => cartAdder()}
            className="w-1/3 text-[30px] cursor-pointer flex items-center justify-center"
          >
            +
          </div>
        </div>
      </div>

      <div className="m-4 mt-6 font-bold">
        Total <br />
        <span className="font-normal">₹ {counter * props.price}</span>
      </div>
      <div className="m-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeItemCompletely();
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Remove Item
        </button>
        
      </div>
    </div>
  );
}
