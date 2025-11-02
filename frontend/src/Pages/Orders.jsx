import { useState, useEffect } from "react";

export default function Orders() {
  const username = localStorage.getItem("username");
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getOrders() {
      try {
        const response = await fetch("http://192.168.49.2:30203/get_orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    }
    getOrders();
  }, [username]);

  return (
    <div className="flex flex-col p-12 items-center justify-center min-h-screen bg-gray-50">
      <h1 className="font-bold text-3xl mb-10 text-gray-800">My Orders</h1>

      {message && (
        <div className="mb-6 px-4 py-2 bg-green-100 text-green-800 rounded-lg shadow">
          {message}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-gray-500 text-lg">You have no orders yet.</div>
      ) : (
        <div className="w-[90%] max-w-6xl bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="p-4">Product Name</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Ship To</th>
                <th className="p-4">Will Arrive By</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <OrderRow
                  key={index}
                  order={order}
                  setMessage={setMessage}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function OrderRow({ order, setMessage }) {
  const orderId = order._id;
  const ordersObj = order.orders || {};
  const [refundStatus, setRefundStatus] = useState({});

  function getRandomArrivalDate() {
    const daysToAdd = Math.floor(Math.random() * 8) + 3;
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  async function handleCancel(itemId) {
    setRefundStatus((prev) => ({ ...prev, [itemId]: "Refund in progress..." }));

    try {
      const response = await fetch("http://192.168.49.2:30203/delete_order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId }),
      });

      const reply = await response.json();

      if (response.ok) {
        setMessage("Refund details will be sent to your email (Order cancelled)");
        setTimeout(() => setMessage(""), 1200);
        setTimeout(() => window.location.reload(), 1300);
      } else {
        setMessage(reply.message || "Failed to delete order");
        setTimeout(() => setMessage(""), 1200);
      }
    } catch (err) {
      console.error("Error deleting order:", err);
      setMessage("Server error while cancelling order");
      setTimeout(() => setMessage(""), 1200);
    }
  }

  return (
    <>
      {Object.keys(ordersObj).map((id, i) => {
        const arrivalDate = getRandomArrivalDate();
        const isRefunding = refundStatus[id];

        return (
          <tr
            key={`${order._id}-${id}`}
            className={`border-b hover:bg-gray-100 transition ${
              i % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <td className="p-4 text-gray-800">{ordersObj[id].name}</td>
            <td className="p-4">{ordersObj[id].quantity}</td>
            <td className="p-4 text-gray-600">
              {order.address}, {order.city}, {order.zip}
            </td>
            <td className="p-4 font-semibold text-green-700">{arrivalDate}</td>
            <td className="p-4">
              {isRefunding ? (
                <span className="text-orange-600 font-semibold">
                  {isRefunding}
                </span>
              ) : (
                <button
                  onClick={() => handleCancel(id)}
                  className="px-4 py-2 text-sm rounded-lg bg-red-300 text-black hover:bg-red-600 transition"
                >
                  Cancel Order
                </button>
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
}
