import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

export default function Success() {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();
  }, []);
  

  return (
    <>
      <div align="center" className="p-3">
        <h1>Payment Successful!</h1>
        <p>Your payment was processed successfully you may not return to the store.</p>
        <Link to="/">Return to Store</Link>
      </div>
    </>
  )
}
