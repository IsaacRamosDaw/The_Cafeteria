import { ThemeProvider } from "./contexts/ThemeContext";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Welcome from "./pages/welcome/Welcome";
import Account from "./pages/account/Account";
import Orders from "./pages/orders/Orders";
import Products from "./pages/products/Products";
import "./global.scss";

// Student
import HomeStudent from "./pages/home/HomeStudent.jsx";
import Form from "./pages/form/Form";
import MenuPage from "./pages/Menu/MenuPage";
import StudentSettings from "./pages/settings/studentSettings/StudentSettings";

// Admin 
import Admin from "./pages/admin/Admin";
import CreateAdmin from "./components/adminComponents/forms/adminForms/CreateAdmin";
import EditAdmin from "./components/adminComponents/forms/adminForms/EditAdmin";

// School 
import CreateSchool from "./components/adminComponents/forms/schoolForms/CreateSchool";
import EditSchool from "./components/adminComponents/forms/schoolForms/EditSchool";

// Worker 
import HomeWorker from "./pages/home/HomeWorker.jsx";
// import MenuPageWorker from "./pages/Menu/MenuPageWorker.jsx";
import CreateWorker from "./components/adminComponents/forms/workerForms/CreateWorker";
import EditWorker from "./components/adminComponents/forms/workerForms/EditWorker";
import OwnerSettings from "./pages/settings/ownerSettings/OwnerSettings"

// Settings components
import AccountSettings from "./pages/settings/studentSettings/accountSettings/AccountSettings.jsx";
import CreditSetting from "./pages/settings/studentSettings/creditSettings/CreditSetting.jsx";
import MyCafeteria from "./pages/settings/studentSettings/myCafeteria/MyCafeteria.jsx";
import Favorites from "./pages/settings/studentSettings/favorites/Favorites.jsx";
import Policy from "./pages/settings/studentSettings/policy/Policy.jsx";
import ErrorPage from "./pages/errorPage/ErrorPage.jsx";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/form" element={<Form />} />
          <Route path="/products" element={<Products />} />
          <Route path="/dashboard" element={<Admin />} />

          {/* Worker routes */}
          <Route path="/worker" element={<CreateWorker />} />
          <Route path="/worker/:id" element={<EditWorker />} />
          <Route path="/homeworker" element={<HomeWorker />} />
          {/* <Route path="/menuworker" element={<MenuPageWorker />} /> */}

          {/* Admin routes */}
          <Route path="/admin" element={<CreateAdmin />} />
          <Route path="/admin/:id" element={<EditAdmin />} />

          {/* School routes */}
          <Route path="/school" element={<CreateSchool />} />
          <Route path="/school/:id" element={<EditSchool />} />

          {/* student routes */}
          <Route path="/home" element={<HomeStudent />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/studentsettings" element={<StudentSettings />} />
          <Route path="/ownersettings" element={<OwnerSettings />} />
          <Route path="/account" element={<Account />} />

          {/* Setting components routes */}
          <Route path={"/accountSetting"} element={ <AccountSettings /> } />
          <Route path={"/credits"} element={ <CreditSetting /> } />
          <Route path={"/favorites"} element={ <Favorites /> } />
          <Route path={"/mycafeteria"} element={ <MyCafeteria /> } />
          <Route path={"/policy"} element={ <Policy /> } />

          <Route path={"/error"} element={ <ErrorPage /> } />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
