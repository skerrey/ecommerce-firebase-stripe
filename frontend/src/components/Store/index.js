// Description: Ecommerce store

import { Row, Col } from "react-bootstrap";
import { productsArray } from "../../productStore";
import ProductCard from "../ProductCard/index";
import { useAuth } from '../../contexts/AuthContext';
import "./style.css"

function Store() {
  const { currentUser } = useAuth();

  return (
    <>
      <div className="store">
        <h1 align="center" className="p-3">Welcome {currentUser ? currentUser.displayName : "to the Store"}!</h1>
        <Row xs={1} md={3} className="g-4">
          {productsArray.map((product, index) => ( // maps through productsArray and displays each product
            <Col align="center" key={index}>
              <ProductCard product={product} />
            </Col>
          ))}

        </Row>
      </div>
    </>
  )
}

export default Store;