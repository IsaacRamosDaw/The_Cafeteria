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
import SchoolForm from "./pages/admin/forms/SchoolForm";
import WorkerForm from "./pages/admin/forms/WorkerfORM";
import "./global.scss";

// Admin form Components
import CreateAdmin from "./components/adminComponents/forms/adminForms/createAdmin";
import EditAdmin from "./components/adminComponents/forms/adminForms/editAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/form" element={<Form />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/menus" element={<Menu />} />
        <Route path="/products" element={<Products />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/school" element={<SchoolForm />} />
        <Route path="/coffeShop" element={<CoffeShopForm />} />
        <Route path="/workers" element={<WorkerForm />} />
        {/* Admin routes */}
        <Route path="/admin" element={<CreateAdmin />} />
        <Route path="/admin/:id" element={<EditAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
