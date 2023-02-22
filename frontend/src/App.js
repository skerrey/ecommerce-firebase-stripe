import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginNav from "./components/firebase/LoginNav";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cancel from "./pages/Cancel";
import Store from "./pages/Store";
import Success from "./pages/Success";
import Navbar from "./components/stripe/Navbar";
import CartProvider from "./contexts/CartContext";
import AuthProvider from "./contexts/AuthContext";
import Dashboard from "./components/firebase/Dashboard";
import PrivateRoute from "./components/firebase/PrivateRoute";
import Signup from "./components/firebase/Signup";
import Login from "./components/firebase/Login";
import UpdateProfile from "./components/firebase/UpdateProfile";
import ForgotPassword from "./components/firebase/ForgotPassword";

function App() {
  return (
    <>
      <AuthProvider>
      <CartProvider>
        <Container>

          <Navbar />
          <Router>
          <LoginNav />
            <Routes>
              <Route index element={<Store />} />
              <Route path="success" element={<Success />} />
              <Route path="cancel" element={<Cancel />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
              <Route path="/settings" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}/>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </Router>
        </Container>
      </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
