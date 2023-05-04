// Description: Testing for the Navigation component

import Navigation from './index';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

const user = userEvent.setup();
const mockLogout = jest.fn();
const mockNavigate = jest.fn();

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () {},
    removeListener: function () {}
  };
};

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
    <Navigation />
  </BrowserRouter>
)

describe('Navigation', () => {
  test('logo in navbar', async () => {
    render(mockRouter);
    const logo = screen.getByAltText('logo')
    await user.click(logo);
    expect(window.location.pathname).toBe('/');
  });

  test('home button in navbar', async () => {
    render(mockRouter);
    const homeNavLink = screen.getByRole('link', { name: 'Home'})
    await user.click(homeNavLink);
    expect(window.location.pathname).toBe('/');
  });

  test('nav dropdown renders', async () => {
    render(mockRouter);
    const toggleNavDropdown = screen.getByRole('button', { name: 'John Doe' });
    await user.click(toggleNavDropdown);
    expect(screen.getByRole('link', { name: 'Dashboard'})).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Settings'})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log Out'})).toBeInTheDocument();
  });

  test('nav dropdown logout button', async () => {
    render(mockRouter);
    const toggleNavDropdown = screen.getByRole('button', { name: 'John Doe' });
    fireEvent.click(toggleNavDropdown);
    const logoutNavButton = screen.getByRole('button', { name: 'Log Out'});
    await user.click(logoutNavButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
