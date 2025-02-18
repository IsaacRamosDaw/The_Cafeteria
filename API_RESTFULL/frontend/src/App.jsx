import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./global.scss";

// import Home from "./pages/home/Home.jsx";
// import StudentCredits from "./pages/settings/studentSettings/creditSettings/CreditSetting.jsx";
// import StudentFavs from "./pages/settings/studentSettings/favorites/Favorites.jsx";
// import StudentData from "./pages/account/Account";

// Contexts
import { ThemeProvider } from "./contexts/ThemeContext";
import OrdersContextProvider from "./contexts/OrderContextProvider.jsx";
import WebSocketsContextProvider from "./contexts/WebSocketsContextProvider.jsx";

//! Shared Pages
import Welcome from "./pages/welcome/Welcome.page.jsx"; //* Login
import Orders from "./pages/orders/Orders.page.jsx"; //* Orders
import Menu from "./pages/menu/Menu.page.jsx"; //* Menu which decides what show inside by user role
import Policy from "./pages/settings/policy/Policy.page.jsx"; //* Private poicy
import ErrorPage from "./pages/errorPage/ErrorPage.jsx"; //* Error if you dont't have token

//! Admin Pages
import Admin from "./pages/admin/Admin.page.jsx"; //* Admin dashboard
import AdminForm from "./components/adminComponents/forms/adminForms/AdminForm.jsx";
import CoffeShopsForms from "./components/adminComponents/forms/coffeShopsForms/CoffeShopsForms.jsx";
import SchoolForm from "./components/adminComponents/forms/schoolForms/SchoolForm.jsx";

//! Student Pages
import StudentForm from "./pages/form/StudentForm.page.jsx"; //* Student form to register
import StudentProfile from "./pages/settings/studentSettings/StudentSettings.page.jsx"; //* Student profile
import StudentCoffeShop from "./pages/settings/studentSettings/studentCoffeShop/StudentCoffeShop.page.jsx"; //* Student coffe shop info
import StudentUpdate from "./pages/settings/studentSettings/studentUpdate/StudentUpdate.page.jsx"; //* Student profile update personal info
import ProductsList from "./pages/productsList/ProductsList.page.jsx"; //* Product list by category
import Product from "./pages/product/Product.page.jsx"; //* Product selected before

//! Worker Pages
import WorkerProfile from "./pages/settings/workerSettings/WorkerSettings.page.jsx"; //* Worker profile
import WorkerCoffeShop from "./pages/settings/workerSettings/workerCoffeShop/WorkerCoffeShop.page.jsx"; //* Worker Coffe shop info
import WorkerUpdate from "./pages/settings/workerSettings/workerUpdate/WorkerUpdate.page.jsx"; //* Worker profile update personal info
import WorkerForm from "./components/adminComponents/forms/workerForms/WorkerForm.jsx";
import CourseForm from "./components/adminComponents/forms/coursesForms/CourseForm.jsx";

//! WebSocket Pages

function App() {
  return (
    <OrdersContextProvider>
      <WebSocketsContextProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="*" element={<Welcome />} />

              {/* Page routes */}
              <Route path="/" element={<Welcome />} />
              {/* <Route path="/home" element={<Menu />} /> */}
              <Route path="/menu" element={<Menu />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile/policy" element={<Policy />} />
              <Route path="/error" element={<ErrorPage />} />

              {/* Admin routes */}
              <Route path="/dashboard" element={<Admin />} />
              <Route path="/admin" element={<AdminForm />} />
              <Route path="/admin/:id" element={<AdminForm />} />
              <Route path="/course" element={<CourseForm />} />
              <Route path="/course/:id" element={<CourseForm />} />

              {/* School routes */}
              <Route path="/school" element={<SchoolForm />} />
              <Route path="/school/:id" element={<SchoolForm />} />

              {/* CoffeShop routes */}
              <Route path="/coffeShop" element={<CoffeShopsForms />} />
              <Route path="/coffeShop/:id" element={<CoffeShopsForms />} />

              {/* Worker routes */}
              <Route path="/worker" element={<WorkerForm />} />
              <Route path="/worker/:id" element={<WorkerForm />} />
              <Route path="/worker/profile" element={<WorkerProfile />} />
              <Route
                path="/worker/profile/mycafeteria"
                element={<WorkerCoffeShop />}
              />
              <Route path="/worker/profile/update" element={<WorkerUpdate />} />

              {/* student routes */}
              <Route path="/form" element={<StudentForm />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route
                path="/student/profile/mycafeteria"
                element={<StudentCoffeShop />}
              />
              <Route
                path="/student/profile/update"
                element={<StudentUpdate />}
              />
              <Route path="/menu/:category" element={<ProductsList />} />
              <Route path="/menu/:category/:name" element={<Product />} />

              {/* <NEXT SEASON ROUTES /> */}
              {/* <Route path="/home" element={<Home />} /> */}
              {/* <Route path="/student/profile/credits" element={<StudentCredits />} /> */}
              {/* <Route path="/student/profile/data" element={<StudentData />} /> */}
              {/* <Route path="/student/profile/favs" element={<StudentFavs />} /> */}
            </Routes>
          </Router>
        </ThemeProvider>
      </WebSocketsContextProvider>
    </OrdersContextProvider>
  );
}

export default App;
