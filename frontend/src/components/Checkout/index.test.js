// Description: Testing for Checkout component

import Checkout from './index';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';

describe('Checkout', () => {
  const cartValue = {
    items: [
      { id: 'price_1Mep8sEf1jo0J7CjaZORHbed', quantity: 1 }, // Coffee
      { id: 'price_1Mep8hEf1jo0J7CjVA8Wcff3', quantity: 2 }, // Tea
    ],
    getTotalCost: () => 10.0,
  };

  const authValue = {
    currentUser: {
      displayName: 'John Doe',
      email: 'john@example.com',
    },
  };

  const renderWithContext = () =>
    render(
      <AuthContext.Provider value={authValue}>
        <CartContext.Provider value={cartValue}>
          <Checkout />
        </CartContext.Provider>
      </AuthContext.Provider>
    );

  test('render cart header', () => {
    renderWithContext();
    const cartHeader = screen.getByText('Items in your cart:');
    expect(cartHeader).toBeInTheDocument();
  });

  test('render total cost', () => {
    renderWithContext();
    const totalElement = screen.getByText('Total: $10.00');
    expect(totalElement).toBeInTheDocument();
  });

  test('render down arrow', () => {
    renderWithContext();
    const downArrow = screen.getByTestId('down-arrow');
    expect(downArrow).toBeInTheDocument();
  });

  test('render up arrow', () => {
    renderWithContext();
    const checkoutProducts = screen.getByTestId('checkout-products');
    Object.defineProperty(checkoutProducts, 'scrollTop', {
      configurable: true,
      value: 10,
    });
    fireEvent.scroll(checkoutProducts);
    const upArrow = screen.getByTestId('up-arrow');
    expect(upArrow).toBeInTheDocument();
  });
});
