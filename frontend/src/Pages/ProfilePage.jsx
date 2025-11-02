import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");
  console.log("Username from localStorage:", username);
  const navigate = useNavigate();

  if (!username) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center text-gray-600 text-xl">
        <p>User not found or session expired.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl"
        >
          Go to Login
        </button>
      </div>
    );
  }
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://192.168.49.2:30200/get_user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });

        const data = await response.json();
        console.log("Fetched user profile:", data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center text-gray-600 text-xl">
        Loading profile...
      </div>
    );
  }


  return (
    <div className="w-screen min-h-screen flex flex-col items-center p-12 bg-gray-100">
      <div className="text-[30px] font-semibold mb-8">Your Profile</div>

      <div className="bg-white shadow-md rounded-2xl p-10 w-[450px] flex flex-col items-start">
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Username: <span className="text-gray-900">{user.username}</span>
        </div>
        <div className="text-lg font-semibold text-gray-700 mb-4">
          Email: <span className="text-gray-900">{user.email}</span>
        </div>
        {user.createdAt && (
          <div className="text-lg font-semibold text-gray-700 mb-4">
            Password:{" "}
            <span className="text-gray-900">
              {user.password}
            </span>
          </div>
        )}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/orders")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate("/logout")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
