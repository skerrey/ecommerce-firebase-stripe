// Description: Context for product cart

import { createContext, useState, useEffect } from "react";
import { getProductData } from "../productStore";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {}
});

const LOCAL_STORAGE_KEY = "cartProducts";

export function CartProvider({children}) {

  const [cartProducts, setCartProducts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
  ); 

  // Local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartProducts));
  }, [cartProducts]);

  function getProductQuantity(id) {
    const quantity = cartProducts.find(product => product.id === id)?.quantity

    if (quantity === undefined) {
      return 0;
    } 

    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) { // product not in cart
      setCartProducts(
        [
          ...cartProducts,
          {
            id: id,
            quantity: 1
          }
        ]
      )
    } else { // product in cart
      setCartProducts(
        cartProducts.map(
          product =>
          product.id === id
          ? { ...product, quantity: product.quantity + 1}
          : product
        )
      )
    }
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if(quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map(
          product =>
          product.id === id
          ? { ...product, quantity: product.quantity - 1}
          : product
        )
      )
    }
  }

  function deleteFromCart(id) {
    setCartProducts(
      cartProducts =>
      cartProducts.filter(currentProduct => {
        return currentProduct.id !== id;
      })
    )
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id);
      totalCost += (productData.price * cartItem.quantity);
    });
    return totalCost;
  }

  const value = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;