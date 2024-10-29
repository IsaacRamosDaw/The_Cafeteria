import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import Welcome from "./pages/welcome/Welcome";
import Form from "./pages/form/Form";
import MenuPage from "./pages/menuPage/MenuPage";
import Orders from "./pages/orders/Orders";
import ManuListPage from "./pages/menuListPage/MenuListPage";
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
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/menulist" element={<ManuListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
