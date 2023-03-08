// Description: Ecommerce store

import { Row, Col } from "react-bootstrap";
import { productsArray } from "../productStore";
import ProductCard from "../components/stripe/ProductCard";


function Store() {
  return (
    <>
      <h1 align="center" className="p-3">Welcome to the Store!</h1>
      <Row xs={1} md={3} className="g-4">
        {productsArray.map((product, index) => ( // maps through productsArray and displays each product
          <Col align="center" key={index}>
            <ProductCard product={product} />
          </Col>
        ))}

      </Row>
    </>
  )
}

export default Store;