import Login from '../public/Login';
import Signup from '../public/Signup';
import Navbar from '../public/Navbar';
import Order from '../public/Order';
import Store from '../public/Store';
import Tshirt from '../public/Tshirt';
import './App.css'
import { Routes, Route} from 'react-router-dom';
import User from '../public/User';
import OrderList from '../public/OrderList';
import Vendor from '../public/Vendor';
import Shop from '../public/Shop';
import ShopRegistration from '../public/ShopRegistration';
import Products from '../public/Products';
import AddProduct from '../public/AddProduct';
import React, { useEffect, useState } from 'react';
import Update from '../public/Update';
import HomePage from '../public/HomePage';
export const authContext = React.createContext({})



function App() {
  const [userLogin,setUserLogin] = useState(null)
  const [vendorLogin,setVendorLogin] = useState(null)
 

  function loggedIn(token){
     setUserLogin(token)
  }
  function loggedOut(){
    setUserLogin(null)
    setVendorLogin(null)
  }
  function vendorLoggedIn(token){
    setVendorLogin(token)
  }

  useEffect(()=>{
     if(localStorage.getItem('token')) loggedIn(localStorage.getItem('token'))
     else if(localStorage.getItem('shopToken')) vendorLoggedIn(localStorage.getItem('shopToken'))
  },[])


  return (
    <>
    <authContext.Provider
      value={{userLogin,vendorLogin,isLoggedIn:Boolean(userLogin),loggedOut,loggedIn,vendorLoggedIn,isVendorLoggedIn:Boolean(vendorLogin)}}>
    <Navbar/>

    <Routes>
      <Route exact path='/' element={<HomePage/>}/>
      <Route exact path='/home' element={<Store/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/user' element={<User/>}/>
      <Route exact path='/orders' element={<OrderList/>}/>
      <Route exact path='/tshirt/:id' element={<Tshirt/>}/>
      <Route exact path='/order/:id' element={<Order/>}/>
      <Route exact path='/update/:id' element={<Update/>}/>
      <Route exact path='/registerShop' element={<ShopRegistration/>}/>
      <Route exact path='/vendorLogin' element={<Vendor/>}/>
      <Route exact path='/shop' element={<Shop/>}/>
      <Route exact path='/products' element={<Products/>}/>
      <Route exact path='/addProduct' element={<AddProduct/>}/>
      <Route exact path='*' element={<h1>Not Found!!!</h1>}/>
    </Routes>
    </authContext.Provider>

    </>
  )
}

export default App
