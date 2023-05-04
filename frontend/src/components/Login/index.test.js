// Description: Tests for Login component

import Login from './index';
import { fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

const user = userEvent.setup();
const mockLogin = jest.fn();
const mockLoading = jest.fn()
const mockNavigate = jest.fn();

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => {
    return {  
      login: mockLogin,
      loading: mockLoading
    }
  }
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockRouter = (
  <BrowserRouter>
    <Login />
  </BrowserRouter>
)

describe('Login', () => {
  test('renders the login form', () => {
    render(mockRouter);
    expect(screen.getByRole('heading', { name: 'Log In' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
  });

  test('login button', async () => {
    render(mockRouter);
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    await user.click(loginButton);
    expect(mockLogin).toHaveBeenCalled();
  });

  test('calls login with the email and password when the form is submitted & directs to home page', async () => {
    const email = 'test@example.com';
    const password = 'password';
    render(mockRouter);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(mockLoading).toBeTruthy();
    await user.click(loginButton);
    expect(mockLogin).toHaveBeenCalledWith(email, password);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('renders error message when logout fails', async () => {
    mockLogin.mockImplementation(() => {
      throw new Error();
    });
    render(mockRouter);
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    await user.click(loginButton);
    expect(screen.getByText('Failed to sign in')).toBeInTheDocument();
  });

  test('login button, redirects to login page', async () => {
    render(mockRouter);
    const LoginButton = screen.getByRole('link', { name: 'Forgot Password?'})
    await user.click(LoginButton);
    expect(window.location.pathname).toBe('/forgot-password');
  });

  test('signup button, redirects to signup page', async () => {
    render(mockRouter);
    const signupButton = screen.getByRole('link', { name: 'Sign Up'})
    await user.click(signupButton);
    expect(window.location.pathname).toBe('/signup');
  });
});
