import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./global.scss";

// Shared Pages
import Welcome from "./pages/welcome/Welcome";
import Home from "./pages/home/Home.jsx";
import Orders from "./pages/orders/Orders";
import MenuPage from "./pages/Menu/MenuPage";
import Policy from "./pages/settings/policy/Policy.jsx";
import ErrorPage from "./pages/errorPage/ErrorPage.jsx";

// Admin 
import Admin from "./pages/admin/Admin";
import AdminForm from "./components/adminComponents/forms/adminForms/AdminForm.jsx";

// Student
import Form from "./pages/form/Form";
import StudentProfile from "./pages/settings/studentSettings/StudentSettings";
import StudentCoffeShop from "./pages/settings/studentSettings/studentCoffeShop/StudentCafeteria.jsx";
import StudentUpdate from "./pages/settings/studentSettings/studentUpdate/StudentUpdate.jsx";
import StudentCredits from "./pages/settings/studentSettings/creditSettings/CreditSetting.jsx";
import StudentFavs from "./pages/settings/studentSettings/favorites/Favorites.jsx";
import StudentData from "./pages/account/Account";
import ProductsList from "./pages/productsList/ProductsList.jsx";
import Product from "./pages/product/Product.jsx";

// Worker 
import WorkerSettings from "./pages/settings/workerSettings/WorkerSettings.jsx";
import WorkerCoffeShop from "./pages/settings/workerSettings/workerCoffeShop/WorkerCoffeShop.jsx";
import WorkerUpdate from "./pages/settings/workerSettings/workerUpdate/WorkerUpdate.jsx";
import WorkerForm from "./components/adminComponents/forms/workerForms/WorkerForm.jsx";

// School 
// import CreateSchool from "./components/adminComponents/forms/schoolForms/CreateSchool";
import EditSchool from "./components/adminComponents/forms/schoolForms/EditSchool";

//CoffeShop
import CoffeShopsForms from "./components/adminComponents/forms/coffeShopsForms/CoffeShopsForms.jsx";

//Course
import CreateCourse from "./components/adminComponents/forms/coursesForms/CreateCourse.jsx"
import EditCourse from "./components/adminComponents/forms/coursesForms/EditCourse.jsx"

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="*" element={<Welcome />} />

          {/* Page routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/form" element={<Form />} />
          <Route path="/dashboard" element={<Admin />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminForm />} />
          <Route path="/admin/:id" element={<AdminForm />} />

          {/* Worker routes */}
          <Route path="/worker" element={<WorkerForm />} />
          <Route path="/worker/:id" element={<WorkerForm />} />
          <Route path="/worker/profile" element={<WorkerSettings />} />
          <Route path="/worker/profile/mycafeteria" element={<WorkerCoffeShop />} />
          <Route path="/worker/profile/update" element={<WorkerUpdate />} />

          {/* student routes */}
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/profile/mycafeteria" element={<StudentCoffeShop />} />
          <Route path="/student/profile/data" element={<StudentData />} />
          <Route path="/student/profile/credits" element={<StudentCredits />} />
          <Route path="/student/profile/favs" element={<StudentFavs />} />
          <Route path="/student/profile/update" element={<StudentUpdate />} />

          {/* Menu routes */}
          <Route path="/menu/:category" element={<ProductsList />} />
          <Route path="/menu/:category/:name" element={<Product />} />

          {/* Setting components routes */}
          <Route path="/profile/policy" element={<Policy />} />
          <Route path="/error" element={<ErrorPage />} />

          {/* Course routes */}
          <Route path="/course" element={<CreateCourse/>}/>
          <Route path="/course/:id" element={<EditCourse/>}/>
          
          {/* School routes */}
          {/* <Route path="/school" element={<CreateSchool />} /> */}
          <Route path="/school/:id" element={<EditSchool />} />

          {/* CoffeShop routes */}
          <Route path="/coffeShop" element={<CoffeShopsForms/>}/>
          <Route path="/coffeShop/:id" element={<CoffeShopsForms/>}/>

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
