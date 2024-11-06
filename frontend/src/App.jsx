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
import CreateSchool from "./components/adminComponents/forms/schoolForms/CreateSchool";
import CreateWorker from "./components/adminComponents/forms/workerForms/CreateWorker";
import EditWorker from "./components/adminComponents/forms/workerForms/EditWorker";
import EditSchool from "./components/adminComponents/forms/schoolForms/EditSchool";
import "./global.scss";

import CreateAdmin from "./components/adminComponents/forms/adminForms/CreateAdmin";
import EditAdmin from "./components/adminComponents/forms/adminForms/EditAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/form" element={<Form />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/menus" element={<Menu />} />
        <Route path="/products" element={<Products />} />
        <Route path="/dashboard" element={<Admin />} />
        {/* Worker routes */}
        <Route path="/worker" element={<CreateWorker />} />
        <Route path="/worker/:id" element={<EditWorker />} />
        {/* Admin routes */}
        <Route path="/admin" element={<CreateAdmin />} />
        <Route path="/admin/:id" element={<EditAdmin />} />
        {/* School routes */}
        <Route path="/school" element={<CreateSchool />} />
        <Route path="/school/:id" element={<EditSchool />} />
      </Routes>
    </Router>
  );
}

export default App;
