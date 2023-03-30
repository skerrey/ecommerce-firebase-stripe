import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
                <Route exact path="/checkout" element={<Checkout />} />
                <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
                <Route exact path="/settings" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}/>
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/forgot-password" element={<ForgotPassword />} />
                <Route exact path="/success" element={<Success />} />
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
