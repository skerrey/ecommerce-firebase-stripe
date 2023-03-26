// Description: Product card styling component

import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { CartContext } from "../../contexts/CartContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { BsFillTrash2Fill, BsFillCartCheckFill } from "react-icons/bs";

function ProductCard(props) { // props.product is the product we are selling
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);


  const [show, setShow] = useState(false); // Handles show upon mouse enter/leave
  const [clicked, setClicked] = useState(false); // Handles button visibility when clicked

  useEffect(() => { // When the product is added to the cart, show the button "Add to Cart"
    if (productQuantity > 0) {
      setShow(true);
      setClicked(true);
    }
  }, [productQuantity]);

  function onMouseEnter() { // When the mouse enters the card, show the button "Add to Cart"
    setShow(true);
  }

  function onMouseLeave() { // When the mouse leaves the card, hide the button "Add to Cart"
    if (clicked === true) {
      setShow(true);
    } else { setShow(false); }
  }

  function isClicked() { // When the mouse clicks the "Add to Cart" button, buttons remain visible
    if (clicked === false) {
      setClicked(true);
    } else { setClicked(false); }
  }

  return (
    <>
      <Card className="product-card" style={{
        backgroundImage: `url(${product.image})`,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
        <Card.Body className="product-card-body">
          <div className="product-card-title">
            <h5>{product.title}</h5>
            <p>${product.price}</p>
          </div>

          <div className="product-card-display">

            { // If the product is in the cart, display the quantity and buttons to add or remove one from the cart 
            show && (productQuantity > 0 ?
              <div className="product-card-up" style={{ animation: 
                isClicked ? "product-card-up ease-in-out 0.6s" : "none"
              }}>
                <p className="pt-2">Add To Cart</p>
                <Form as={Row}>
                  <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
                  <Col sm="6">
                    <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)} className="product-card-btn-custom">-</Button>
                    <Button sm="6" onClick={() => cart.addOneToCart(product.id)} className="product-card-btn-custom">+</Button>
                  </Col>
                </Form>
                <Row className="justify-content-around">
                  <Col sm="6">
                    <Button className="product-card-btn-custom" variant="danger" onClick={(e) => { 
                      cart.deleteFromCart(product.id); 
                      isClicked(e);
                    }}>
                      <BsFillTrash2Fill />
                    </Button>
                  </Col>
                  <Col sm="6" className="my-2">
                    <Link to="/checkout" className="btn btn-light">
                      Checkout <BsFillCartCheckFill className="text-success" />
                    </Link>
                  </Col>
                </Row>

              </div> 
              :
              <Button className="product-card-btn-add" onClick={(e) => {
                cart.addOneToCart(product.id); 
                isClicked(e);
              }}>Add To Cart</Button>
            )}
          </div>

        </Card.Body>
      </Card>    
      
    </>
  )
}

export default ProductCard;