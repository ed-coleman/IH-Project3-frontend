import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import SellProductPage from "./Pages/SellProductPage";
import UpdatePage from "./Pages/UpdatePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import CheckoutPage from "./Pages/CheckoutPage";


function App() {
  return (
    <div className="App">
      <h1>Project 3</h1>
      <Link to="/profile">profile</Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/products/new" element={<SellProductPage />} />
        <Route path="/products/update/:productId" element={<UpdatePage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path = '/profile' element ={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path = '/checkout' element ={<CheckoutPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />     
      </Routes>
    </div>
  );
}

export default App;
