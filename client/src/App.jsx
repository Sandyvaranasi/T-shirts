import React, { Fragment, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Headers";
import Store from "./components/Store/Store";
import NotFound from "./components/404";
import TshirtPage from "./pages/TshirtPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/vendor/Dashboard";
import CreateProduct from "./pages/vendor/CreateProduct";
import VendorOrders from "./pages/vendor/VendorOrders";

export const CartContext = React.createContext({});

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...new Set([...cart, product])]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
      }}
    >
      <Header />
      <div className="container mt-3">
        <Routes>
          <Route path="" element={<Navigate to={"/store"} />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/t-shirts/:id" element={<TshirtPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<h1>Register</h1>} />

          <Route path="/orders" element={<h1>Order Page</h1>} />
          <Route path="/store" element={<h1>All Tshirts</h1>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/vendor/dashboard" element={<Dashboard />}>
            <Route path="create" element={<CreateProduct />} />
            <Route path="orders" element={<VendorOrders />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CartContext.Provider>
  );
}

export default App;
