import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/fav_Cart.png';

export default function Login() {
  const [uname, setuname] = useState("");
  const [pword, setpword] = useState("");
  const [msg, setmsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function loginHandler() {
    const data = { uname, pword };
    try {
      const response = await fetch("http://192.168.49.2:30200/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setmsg(responseData);
      if (responseData.message === "Login Successful") {
        localStorage.setItem("username", uname);
        navigate("/landing");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setmsg({ message: "Login Failed" });
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && pword && uname) loginHandler();
    else if(e.key === "Enter") setmsg({ message: "All fields are required" })
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
      <div className="h-[600px] flex flex-col items-center justify-center w-[400px] bg-gray-100 rounded-xl p-6 shadow-lg">
      <div className="font-bold text-[30px]">Click 2 Cart</div> 
      <img
        src={logo}
        alt="Click 2 Cart Logo"
        className="w-24 h-24 mb-4 rounded-full object-cover shadow-md"
      />
        <div className="text-[26px] font-bold mb-6">Login</div>
        <input value={uname} onChange={(e) => setuname(e.target.value)} className="m-4 h-10 w-72 p-2 rounded-xl border border-gray-300" placeholder="Username" type="text" />
        <div className="relative m-4 w-72"> <input value={pword} onChange={(e) => setpword(e.target.value)} onKeyDown={handleKeyDown} className="h-10 w-full p-2 rounded-xl border border-gray-300 pr-10" placeholder="Password" type={showPassword ? "text" : "password"} aria-label="Password" />
          <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1" aria-label={showPassword ? "Hide password" : "Show password"} >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.012-5.757M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            )}
          </button>
        </div>

        <button onClick={loginHandler} className="bg-green-500 hover:bg-green-600 text-white font-semibold w-32 h-10 rounded-xl border-2 transition duration-200">Submit</button>

        <div className="mt-6 text-sm text-gray-700"> Not registered?{" "}
        <span onClick={() => navigate("/register")} className="text-blue-600 hover:underline cursor-pointer"> Register here</span>
        </div>
        <div className="mt-4 text-red-600">{msg && msg.message}</div>
      </div>
    </div>
  );
}