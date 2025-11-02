import { useState, useEffect } from "react";
import CartCard from "../Components/CartCard";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [total, setTotal] = useState(0);
  const [freqobj, setObj] = useState({});
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [message , setmessage] = useState("")
  
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://192.168.49.2:30202/get_cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const productObjectIds = await response.json();
      console.log("Fetched cart:", productObjectIds);

      let arr = [];
      let sumTotal = 0;
      let frequency = productObjectIds;
      setObj(frequency);

      for (const key in frequency) {
        const response2 = await fetch("http://192.168.49.2:30201/get_product_id", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: key }),
        });
        const product = await response2.json();
        sumTotal += product.price;
        arr.push(product);
      }

      setProducts(arr);
      setTotal(sumTotal);
      setLoaded(true);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  async function removeFromCart(itemId) {
    if (!username) {
      setmessage("Please log in first!");
      return;
    }

    try {
      const response = await fetch("http://192.168.49.2:30203/remove_from_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, itemId }),
      });

      const reply = await response.json();

      if (response.ok) {
        setmessage(reply.message || "Item removed!");
        // navigate(`/cart/${username}`);
        // window.location.reload();
        await fetchProducts();
        // window.location.reload();
      } else {
        setmessage(reply.message || "Error removing item from cart.");
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
      setmessage("Server error while removing item.");
    }
  }

  return (
    <div className="w-screen p-12 flex gap-4 flex-col items-center justify-center">
      <div className="mr-[1000px] font-semibold mb-12 text-[30px]">
        Your Cart
      </div>

      {loaded && products.length > 0 ? (
        products.map((obj) => (
          <CartCard
            key={obj._id}
            name={obj.name}
            price={obj.price}
            img={obj.img}
            id={obj._id}
            freq={freqobj[obj._id]}
            desc={obj.description}
            onRemove={removeFromCart} 
          />
        ))
      ) : (
        <div>No items in your cart.</div>
      )}

      {products.length > 0 && (
        <div
          onClick={() => navigate("/checkout")}
          className="ml-[950px] bg-green-700 p-4 rounded-xl cursor-pointer text-white left-[1100px]"
        >
          Proceed to checkout →
        </div>
      )}
    </div>
  );
}
