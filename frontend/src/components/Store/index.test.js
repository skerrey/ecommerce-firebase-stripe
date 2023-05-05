// Description: Testing for the Store page

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Store from './index';

import { productsArray } from '../../productStore';
import { AuthContext } from '../../contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Store', () => {
  const authValue = {
    currentUser: {
      displayName: 'John Doe',
    },
  };

  test('renders welcome message with user display name', () => {
    render(
      <Router>
        <Store />
      </Router>,
      {
        wrapper: ({ children }) => (
          <AuthContext.Provider value={authValue}>
            {children}
          </AuthContext.Provider>
        ),
      }
    );
    const welcomeMessage = screen.getByText('Welcome John Doe!');
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('render all ProductCard components', () => {
    render(
      <Router>
        <Store />
      </Router>,
      {
        wrapper: ({ children }) => (
          <AuthContext.Provider value={authValue}>
            {children}
          </AuthContext.Provider>
        ),
      }
    );

    productsArray.forEach((product) => {
      const productTitleElement = screen.getByText(product.title);
      expect(productTitleElement).toBeInTheDocument();
    });
  });

  test('renders welcome message without user display name', () => {
    const authValueNoUser = {
      currentUser: null,
    };
    render(
      <Router>
        <Store />
      </Router>,
      {
        wrapper: ({ children }) => (
          <AuthContext.Provider value={authValueNoUser}>
            {children}
          </AuthContext.Provider>
        ),
      }
    );
    const welcomeMessage = screen.getByText('Welcome to the Store!');
    expect(welcomeMessage).toBeInTheDocument();
  });
});
