// Description: Testing for ProductCard component

import ProductCard from './index';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';

import { CartContext } from '../../contexts/CartContext';

describe('ProductCard', () => {
  const addOneToCartMock = jest.fn();
  const removeOneFromCartMock = jest.fn();
  const deleteFromCartMock = jest.fn();
  const getProductQuantityMock = jest.fn();
  const cart = {
    addOneToCart: addOneToCartMock,
    removeOneFromCart: removeOneFromCartMock,
    deleteFromCart: deleteFromCartMock,
    getProductQuantity: getProductQuantityMock
  };

  const product = {
    id: '1',
    title: 'Coffee',
    price: 1.99,
    image: 'image.jpg',
  };

  beforeEach(() => {
    getProductQuantityMock.mockReturnValue(0);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('render the product title', () => {
    render(<Router><ProductCard product={product} /></Router>, { wrapper: ({ children }) => <CartContext.Provider value={cart}>{children}</CartContext.Provider> });
    const titleElement = screen.getByText(product.title);
    expect(titleElement).toBeInTheDocument();
  });

  test('render the product price', () => {
    render(<Router><ProductCard product={product} /></Router>, { wrapper: ({ children }) => <CartContext.Provider value={cart}>{children}</CartContext.Provider> });
    const priceElement = screen.getByText(`$${product.price}`);
    expect(priceElement).toBeInTheDocument();
  });

  test('should call addOneToCart when the "+" button is clicked', () => {
    getProductQuantityMock.mockReturnValue(1);
    render(<Router><ProductCard product={product} /></Router>, { wrapper: ({ children }) => <CartContext.Provider value={cart}>{children}</CartContext.Provider> });

    const addButton = screen.getByLabelText('add one to cart button');
    fireEvent.click(addButton);
    expect(cart.addOneToCart).toHaveBeenCalledWith(product.id);
  });

  test('should call removeOneFromCart when the "-" button is clicked and product is in the cart', () => {
    getProductQuantityMock.mockReturnValue(1);
    render(<Router><ProductCard product={product} /></Router>, { wrapper: ({ children }) => <CartContext.Provider value={cart}>{children}</CartContext.Provider> });

    const removeButton = screen.getByLabelText('delete one from cart button');
    fireEvent.click(removeButton);
    expect(cart.removeOneFromCart).toHaveBeenCalledWith(product.id);
  });

  test('should call deleteFromCart when the trash icon button is clicked and product is in the cart', () => {
    getProductQuantityMock.mockReturnValue(1);
    render(<Router><ProductCard product={product} /></Router>, { wrapper: ({ children }) => <CartContext.Provider value={cart}>{children}</CartContext.Provider> });

    const deleteButton = screen.getByLabelText('delete from cart');
    fireEvent.click(deleteButton);
    expect(cart.deleteFromCart).toHaveBeenCalledWith(product.id);
  });
});
