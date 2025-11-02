import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 
import Landing from './Pages/Landing'
import Newarrivals from './Pages/Newarrivals'
import Categories from './Pages/Categories' 
import Demo from './Pages/Video'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import Register from './Pages/Register'
import Login from './Pages/Login'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from './Pages/Product' 
import CartPage from './Pages/CartPage' 
import Checkout from './Pages/Checkout'
import Orders from './Pages/Orders'
import Sports from './Pages/Sports'
import Ethnic from './Pages/Ethnic'
import Mens from './Pages/Mens'
import Womens from './Pages/Womens'
import Logout from './Pages/Logout'
import ProfilePage from './Pages/ProfilePage'

function App() {


  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}> </Route>
        <Route path="/" element={<Login />}></Route>
        {/* <Route path="/login" element={<Login />}></Route> */}
        <Route path='/landing' element={<><Navbar/> <Categories/><Footer/></>}></Route>
        <Route path='/sports' element={<><Navbar/> <Sports/><Footer/></>}></Route>
        <Route path='/ethnic' element={<><Navbar/> <Ethnic/><Footer/></>}></Route>
        <Route path='/mens' element={<><Navbar/> <Mens/><Footer/></>}></Route>
        <Route path="/dashboard" element={<><Navbar/><Newarrivals/></>}></Route>
        <Route path="/product/:id" element={<><Navbar/><ProductPage/></>} />
        <Route path="/cart/:id" element={<><Navbar/><CartPage/></>} />
        <Route path="/profile/:id" element={<><Navbar/><ProfilePage/></>} />
        <Route path="/checkout" element={<><Navbar/><Checkout/></>} />
        <Route path="/orders" element={<><Navbar/><Orders/></>} />
        <Route path="/logout" element={<Logout />} />
        <Route path='/womens' element={<><Navbar/> <Womens/><Footer/></>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
