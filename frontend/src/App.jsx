import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import Welcome from "./pages/welcome/Welcome";
import Form from "./pages/form/Form";
import Orders from "./pages/orders/Orders";
import Categories from "./pages/categories/Categories";
import Menu from "./pages/menu/MenuPage"
import Products from "./pages/products/Products";
import "./global.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Welcome />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/form" element={<Form />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
