// Description: Testing for Cart component

import Cart from './index';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";

import { CartContext } from '../../contexts/CartContext';
import { getProductData } from '../../productStore';

jest.mock('../../productStore', () => ({
  getProductData: jest.fn(),
}));

describe('Cart', () => {
  const deleteFromCartMock = jest.fn();
  const removeOneFromCartMock = jest.fn();
  const addOneToCartMock = jest.fn();
  const cart = {
    deleteFromCart: deleteFromCartMock,
    removeOneFromCart: removeOneFromCartMock,
    addOneToCart: addOneToCartMock,
  };

  const productData = {
    id: '1',
    title: 'Coffee',
    price: 1.99,
    image: 'image.jpg',
    imageAlt: 'Coffee-image',
  };

  beforeEach(() => {
    getProductData.mockReturnValue(productData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the product title', () => {
    render(<Cart id={productData.id} quantity={2} />, { wrapper: ({ children }) => <CartContext.Provider value={cart}>{children}</CartContext.Provider> });
    const titleElement = screen.getByText("Coffee");
    expect(titleElement).toBeInTheDocument();
  });

  it('should render the product price', () => {
    render(<Cart id={productData.id} quantity={2} />, { wrapper: ({ children }) => <CartContext.Provider value={cart}>{children}</CartContext.Provider> });

    const priceElement = screen.getByText(`$${productData.price}`);
    expect(priceElement).toBeInTheDocument();
  });

  it('should render the product image', () => {
    render(<Cart id={productData.id} quantity={2} />, { wrapper: ({ children }) => <CartContext.Provider value={cart}>{children}</CartContext.Provider> });

    const imageElement = screen.getByAltText(productData.imageAlt);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', productData.image);
  });

  it('should render the quantity', () => {
    render(<Cart id={productData.id} quantity={2} />, { wrapper: ({ children }) => <CartContext.Provider value={cart}>{children}</CartContext.Provider> });

    const quantityElement = screen.getByText('2');
    expect(quantityElement).toBeInTheDocument();
  });

  it('should call addOneToCart when the "+" button is clicked', () => {
    render(<Cart id={productData.id} quantity={2} />, { wrapper: ({ children }) => <CartContext.Provider value={cart}>{children}</CartContext.Provider> });

    const addButton = screen.getByLabelText('add one to cart');
    fireEvent.click(addButton);
    expect(cart.addOneToCart).toHaveBeenCalledWith(productData.id);
  });

  it('should call removeOneFromCart when the "-" button is clicked and quantity is greater than 1', () => {
    render(<Cart id={productData.id} quantity={2} />, { wrapper: ({ children }) => <CartContext.Provider value={cart}>{children}</CartContext.Provider> });

    const removeButton = screen.getByLabelText('remove one from cart');
    fireEvent.click(removeButton);
    expect(cart.removeOneFromCart).toHaveBeenCalledWith(productData.id);
  });

  it('should call deleteFromCart when the "delete from cart" button is clicked and quantity is 1', () => {
    render(<Cart id={productData.id} quantity={1} />, { wrapper: ({ children }) => <CartContext.Provider value={cart}>{children}</CartContext.Provider> });

    const deleteButton = screen.getByLabelText('delete from cart');
    fireEvent.click(deleteButton);
    expect(cart.deleteFromCart).toHaveBeenCalledWith(productData.id);
  });
});
