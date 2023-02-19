// Description: Navbar component

import { Button, Navbar, Offcanvas } from "react-bootstrap";
import { useState, useContext } from "react";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";

function NavbarComponent() {
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({items: cart.items})
    }).then((res) => {
      return res.json();
    }).then((res) => {
      if(res.url) {
        window.location.assign(res.url);
      }
    })
  }
      
  const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart ({productsCount}) Items</Button>
        </Navbar.Collapse>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          { // If there are items in the cart, display them
          productsCount > 0 ? 
            <>
              <p>Items in your cart:</p>
              {cart.items.map((currentProduct, index) => (
                <CartProduct key={index} id={currentProduct.id} quantity={currentProduct.quantity} />
              ))}
              <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

              <Button variant="success" onClick={checkout}>
                Purchase Items
                </Button>
            </>
            :
            <h1>There are no items in your cart</h1>
          }

        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default NavbarComponent;