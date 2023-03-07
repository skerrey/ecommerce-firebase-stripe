// Description: Product card styling component

import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { CartContext } from "../../contexts/CartContext";
import { useContext, useState } from "react";
import './ProductCard.css'

function ProductCard(props) { // props.product is the product we are selling
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);
  console.log(cart.items);

  const [show, setShow] = useState(false); // Handles show upon mouse enter/leave
  const [clicked, setClicked] = useState(false); // Handles button appearance when clicked

  function onMouseEnter() { // When the mouse enters the card, show the button "Add to Cart"
    setShow(true);
  }

  function onMouseLeave() { // When the mouse leaves the card, hide the button "Add to Cart"
    if (clicked === true) {
      setShow(true);
    } else { setShow(false); }
  }

  function isClicked() { // When the mouse clicks the "Add to Cart" button, buttons remain visible
    setClicked(true);
  }

  function isClickedAgain() { // When the mouse clicks the "Delete" button, buttons disappear
    setClicked(false);
  }

  return (
    <>
      <Card className="card" style={{
        backgroundImage: `url(${product.image})`,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
        <Card.Body className="card-body">
          <div className="card-title">
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>${product.price}</Card.Text>
          </div>

          <div className="card-display">

            { // If the product is in the cart, display the quantity and buttons to add or remove one from the cart 
            show && (productQuantity > 0 ?
              <div className="card-up">
                <Form as={Row}>
                  <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
                  <Col sm="6">
                    <Button sm="6" onClick={() => cart.addOneToCart(product.id)} className="mx-2">+</Button>
                    <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)} className="mx-2">-</Button>
                  </Col>
                </Form>
                <Button variant="danger" className="" onClick={(e) => { 
                  cart.deleteFromCart(product.id); 
                  isClickedAgain(e);
                }}>Delete</Button>
              </div>
              :
              <Button className="card-button-add-to-cart" onClick={(e) => {
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