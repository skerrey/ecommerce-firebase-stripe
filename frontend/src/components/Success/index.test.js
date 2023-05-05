// Description: Testing for the Success page

import Success from './index';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';

import { BrowserRouter as Router } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

const user = userEvent.setup();

describe('Success', () => {
  const clearCartMock = jest.fn();

  const cartValue = {
    clearCart: clearCartMock,
  };

  const renderWithContext = () =>
    render(
      <Router>
        <CartContext.Provider value={cartValue}>
          <Success />
        </CartContext.Provider>
      </Router>
    );

  test('renders successfully', () => {
    renderWithContext();
    expect(screen.getByRole('heading', {name:  'Payment Successful!'})).toBeInTheDocument();
    expect(screen.getByText('Your payment was processed successfully you may not return to the store.')).toBeInTheDocument();
  });

  test('renders "Return to Store" link', async () => {
    renderWithContext();
    const returnToStoreLink = screen.getByRole('link', { name: 'Return to Store' });
    expect(returnToStoreLink).toBeInTheDocument();
    await user.click(returnToStoreLink)
    expect(window.location.pathname).toBe('/');
  });

  test('calls clearCart on mount', () => {
    renderWithContext();
    expect(clearCartMock).toHaveBeenCalledTimes(1);
  });
});
