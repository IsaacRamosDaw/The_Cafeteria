import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./global.scss";

// import Home from "./pages/home/Home.jsx";
// import CreateCoffeShop from "./components/adminComponents/forms/coffeShopsForms/CreateCoffeShop.jsx"
// import StudentCredits from "./pages/settings/studentSettings/creditSettings/CreditSetting.jsx";
// import StudentFavs from "./pages/settings/studentSettings/favorites/Favorites.jsx"; 
// import StudentData from "./pages/account/Account";
// import CreateSchool from "./components/adminComponents/forms/schoolForms/CreateSchool";
// import EditSchool from "./components/adminComponents/forms/schoolForms/EditSchool.page.jsx"; //* School edit form
// import EditCoffeShop from "./components/adminComponents/forms/coffeShopsForms/EditCoffeShop.jsx" //* Edite coffe shop info

//! Shared Pages
import Welcome from "./pages/welcome/Welcome.page.jsx"; //* Login 
import Orders from "./pages/orders/Orders.page.jsx"; //* Orders 
import Menu from "./pages/menu/Menu.page.jsx"; //* Menu which decides what show inside by user role
import Policy from "./pages/settings/policy/Policy.page.jsx"; //* Private poicy    
import ErrorPage from "./pages/errorPage/ErrorPage.jsx"; //* Error if you dont't have token

//! Admin Pages
import Admin from "./pages/admin/Admin.page.jsx"; //* Admin dashboard
import CreateAdmin from "./components/adminComponents/forms/adminForms/CreateAdmin.page.jsx"; //* Admin create
import EditAdmin from "./components/adminComponents/forms/adminForms/EditAdmin.page.jsx"; //* Edit admin selected
import CreateWorker from "./components/adminComponents/forms/workerForms/CreateWorker.page.jsx"; //* Create worker form
import EditWorker from "./components/adminComponents/forms/workerForms/EditWorker.page.jsx"; //* Edite worker selected
import CreateCourse from "./components/adminComponents/forms/coursesForms/CreateCourse.jsx" //* Create course
import EditCourse from "./components/adminComponents/forms/coursesForms/EditCourse.jsx" //* Edit course
import EditSchool from "./components/adminComponents/forms/schoolForms/EditSchool.page.jsx";
import CoffeShopsForms from "./components/adminComponents/forms/coffeShopsForms/CoffeShopsForms.jsx";

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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>

          <Route path="*" element={<Welcome />} />

          {/* Page routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Menu />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile/policy" element={<Policy />} />
          <Route path="/error" element={<ErrorPage />} />

          {/* Admin routes */}
          <Route path="/dashboard" element={<Admin />} />
          <Route path="/admin" element={<CreateAdmin />} />
          <Route path="/admin/:id" element={<EditAdmin />} />
          <Route path="/course" element={<CreateCourse />} />
          <Route path="/course/:id" element={<EditCourse />} />

          {/* masnour rutes */}
          {/* CoffeShop routes */}
          <Route path="/school/:id" element={<EditSchool />} />
          <Route path="/coffeShop" element={<CoffeShopsForms />} />
          <Route path="/coffeShop/:id" element={<CoffeShopsForms />} />

          {/* Worker routes */}
          <Route path="/worker" element={<CreateWorker />} />
          <Route path="/worker/:id" element={<EditWorker />} />
          <Route path="/worker/profile" element={<WorkerProfile />} />
          <Route path="/worker/profile/mycafeteria" element={<WorkerCoffeShop />} />
          <Route path="/worker/profile/update" element={<WorkerUpdate />} />

          {/* student routes */}
          <Route path="/form" element={<StudentForm />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/profile/mycafeteria" element={<StudentCoffeShop />} />
          <Route path="/student/profile/update" element={<StudentUpdate />} />
          <Route path="/menu/:category" element={<ProductsList />} />
          <Route path="/menu/:category/:name" element={<Product />} />

          {/* <NEXT SEASON ROUTES /> */}
          {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route path="/student/profile/credits" element={<StudentCredits />} /> */}
          {/* <Route path="/student/profile/data" element={<StudentData />} /> */}
          {/* <Route path="/student/profile/favs" element={<StudentFavs />} /> */}
          {/* <Route path="/school" element={<CreateSchool />} /> */}
          {/* <Route path="/school/:id" element={<EditSchool />} /> */}
          {/* <Route path="/coffeShop" element={<CreateCoffeShop/>}/> */}
          {/* <Route path="/coffeShop/:id" element={<EditCoffeShop/>}/> */}

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
