import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import Welcome from "./pages/welcome/Welcome";
import Form from "./pages/form/Form";
import Orders from "./pages/orders/Orders";
import Categories from "./pages/categories/Categories";
import Menu from "./pages/menu/MenuPage"
import Products from "./pages/products/Products";
import Admin from "./pages/admin/Admin";
import CoffeShopForm from "./pages/admin/forms/CoffeShopForm";
import AdminForm from "./pages/admin/forms/AdminForm";
import SchoolForm from "./pages/admin/forms/SchoolForm";
import WorkerForm from "./pages/admin/forms/WorkerfORM";
import "./global.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Welcome />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/form" element={<Form />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/menus" element={<Menu />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/createAdmins" element={<AdminForm />} />
        <Route path="/createSchools" element={<SchoolForm />} />
        <Route path="/createCoffeShops" element={<CoffeShopForm />} />
        <Route path="/createWorkers" element={<WorkerForm />} />
      </Routes>
    </Router>
  );
}

export default App;
