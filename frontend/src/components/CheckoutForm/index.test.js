// Description: Testing for CheckoutForm component

import CheckoutForm from './index';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { AuthContext } from '../../contexts/AuthContext';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

describe('CheckoutForm', () => {
  const authValue = {
    currentUser: {
      displayName: 'John Doe',
      email: 'john@example.com',
    },
  };

  const renderWithContext = () =>
    render(
      <AuthContext.Provider value={authValue}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </AuthContext.Provider>
    );

  test('renders successfully', async () => {
    renderWithContext();
    const nameLabel = screen.getByLabelText('Name');
    // eslint-disable-next-line testing-library/no-node-access
    const stripeForm = document.querySelector('#link-authentication-element')
    expect(nameLabel).toBeInTheDocument();
    expect(stripeForm).toBeInTheDocument();
  });

  test('renders form fields', () => {
    renderWithContext();
    const nameInput = screen.getByRole('textbox');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveValue(authValue.currentUser.displayName);
  });
});
