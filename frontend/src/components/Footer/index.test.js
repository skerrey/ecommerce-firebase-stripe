// Description: Testing for the Footer component

import Footer from './index';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

const user = userEvent.setup();
const mockLogout = jest.fn();
const mockNavigate = jest.fn();

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => {
    return {  
      currentUser: {
        displayName: 'John Doe',
        email: 'test@example.com'
      },
      logout: mockLogout
    }
  }
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockRouter = (
  <BrowserRouter>
    <Footer />
  </BrowserRouter>
)

describe('Footer', () => {
  test('renders the home, dashboard, settings, and logout links for authenticated users', () => {
    render(mockRouter);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('logging out user and redirect to login page', async () => {
    render(mockRouter);
    const logoutButton = screen.getByRole('link', { name: 'Logout' });
    await user.click(logoutButton); 
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
