// Description: Product card styling component

import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext, useState, useEffect } from "react";

function ProductCard(props) { // props.product is the product we are selling
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);
  console.log(cart.items);

  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   if (show) {
  //     console.log("showing");
  //   } else {
  //     console.log("hiding");
  //   }
  // }, [show]); 

  return (
    <>
      <Card style={{

        height: "30rem",
        backgroundImage: `url(${product.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
        <Card.Body>
          <div style={{
            backgroundColor: "#fff",
            width: "100%",
            borderRadius: "10px",
            opacity: "0.8",
            zIndex: "1",
          }}>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>${product.price}</Card.Text>
          </div>

          <div style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
          }}>
            { // If the product is in the cart, display the quantity and buttons to add or remove one from the cart 
            show && (productQuantity > 0 ?
              <>
                <Form as={Row}>
                  <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label>
                  <Col sm="6">
                    <Button sm="6" onClick={() => cart.addOneToCart(product.id)} className="mx-2">+</Button>
                    <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)} className="mx-2">-</Button>
                  </Col>
                </Form>
                <Button variant="danger" className="my-2" onClick={() => cart.deleteFromCart(product.id)}>Delete</Button>
              </>
              :
              <Button variant="primary" className="my-2" onClick={() => cart.addOneToCart(product.id)}>Add To Cart</Button>
            )}
          </div>

        </Card.Body>
      </Card>    
    </>
  )
}

export default ProductCard;