import { ThemeProvider } from "./contexts/ThemeContext";
import "./global.scss";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import Welcome from "./pages/welcome/Welcome";
import Form from "./pages/form/Form";
import Orders from "./pages/orders/Orders";
import Products from "./pages/products/Products";
import Admin from "./pages/admin/Admin";
import "./global.scss";
// Admin Crud
import CreateAdmin from "./components/adminComponents/forms/adminForms/CreateAdmin";
import EditAdmin from "./components/adminComponents/forms/adminForms/EditAdmin";
// School Crud
import CreateSchool from "./components/adminComponents/forms/schoolForms/CreateSchool";
import EditSchool from "./components/adminComponents/forms/schoolForms/EditSchool";
// Worker Crud
import CreateWorker from "./components/adminComponents/forms/workerForms/CreateWorker";
import EditWorker from "./components/adminComponents/forms/workerForms/EditWorker";
import MenuPage from "./pages/Menu/MenuPage";
// Settings
import StudentSettings from "./pages/settings/studentSettings/StudentSettings";
import OwnerSettings from "./pages/settings/ownerSettings/OwnerSettings"
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/account" element={<Account />} />
          <Route path="/form" element={<Form />} />
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
          {/* Settings routes */}
          <Route path="/studentsettings" element={<StudentSettings />} />
          <Route path="/ownersettings" element={<OwnerSettings />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
