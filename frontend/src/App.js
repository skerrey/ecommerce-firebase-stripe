import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Store from "./components/Store/index";
import CartProvider from "./contexts/CartContext";
import AuthProvider from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard/index";
import PrivateRoute from "./firebase/PrivateRoute";
import Signup from "./components/Signup/index";
import Login from "./components/Login/index";
import UpdateProfile from "./components/UpdateProfile/index";
import ForgotPassword from "./components/ForgotPassword/index";
import Navigation from "./components/Navigation/index";
import Checkout from "./components/Checkout/index";
import Footer from "./components/Footer/index";
import Success from "./components/Success/index";

function App() {
  return (
    <>
      <AuthProvider>
      <CartProvider>

          <Router>
            <Navigation />
            <Container>
              <Routes>
                <Route index element={<Store />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
                <Route path="/settings" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/success" element={<Success />} />
              </Routes>
            </Container>
            <Footer />
          </Router>

      </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
