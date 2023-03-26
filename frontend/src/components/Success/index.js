import React from 'react'
import { Link } from 'react-router-dom';

export default function Success() {

  localStorage.removeItem("cartProducts"); // removes cartProducts from local storage

  return (
    <>
      <div align="center" className="p-3">
        <h1>Payment Successful!</h1>
        <p>Your payment of was processed successfully you may not return to the store.</p>
        <Link to="/">Return to Store</Link>
      </div>
    </>
  )
}
