// Description: Navigation component

import React, { useState, useContext } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { CartContext } from "../../contexts/CartContext";
import Cart from '../Cart/index';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from "../../logo.svg";
import "./style.css"

// Icons
import { IoMdSettings } from "react-icons/io";
import { FiShoppingCart } from 'react-icons/fi';
import { BsFillCartCheckFill } from "react-icons/bs";

export default function Navigation() {

  const cart = useContext(CartContext);
  const { currentUser, logout } = useAuth();

  const [, setError] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  // logout user on click
  async function handleLogout() { 
    setError('');
    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  // Change expand to "xs, sm, md, lg, xl" for screen size
  let expand = "sm";
   
  // Get total number of items in cart
  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <>
      <Navbar bg="light" expand={expand} className="navigation-navbar">
        <Container>
          <Navbar.Brand href="/" className="navigation-navbar-brand">
            <img src={logo} alt="logo" className="navigation-logo-img" />
            Coffee Hut
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="ms-auto" align="end">
              <Nav.Link href="/">Home</Nav.Link>

              {/* If current user display dropdown, else display login */}
              {!currentUser ? 
                <Nav.Link href="/login">Login</Nav.Link> 
                :               
                <NavDropdown title={currentUser.displayName} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                  <NavDropdown.Item href="/settings">Settings <IoMdSettings /> </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              }
              
              <Button onClick={handleShow}><FiShoppingCart /> ({productsCount}) Items</Button>

              <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton className="navigation-offcanvas-header">
                  <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                  { // If there are items in the cart, display them
                  productsCount > 0 ? 
                    <>
                      {cart.items.map((currentProduct, index) => (
                        <Cart key={index} id={currentProduct.id} quantity={currentProduct.quantity} />
                      ))}
                      <h4>Total: ${cart.getTotalCost().toFixed(2)}</h4>
                      <a href="/checkout" onClick={handleClose} className="btn btn-light navigation-btn-checkout">
                        Checkout <BsFillCartCheckFill className="text-success" />
                      </a>
                    </>
                    :
                    <h4>There are no items in your cart</h4>
                  }

                </Offcanvas.Body>
              </Offcanvas>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}