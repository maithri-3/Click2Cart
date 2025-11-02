import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await fetch("http://192.168.49.2:30200/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        console.log("Logout response:", data);
        localStorage.removeItem("username");

        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
        navigate("/");
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="text-xl text-gray-700 font-semibold">
        Logging out...
      </div>
    </div>
  );
}
