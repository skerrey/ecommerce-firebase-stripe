// Description: Tests for ForgotPassword component

import ForgotPassword from './index';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

const user = userEvent.setup();
const mockResetPassword = jest.fn();

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => {
    return {  
      resetPassword: mockResetPassword
    }
  }
}));

const mockRouter = (
  <BrowserRouter>
    <ForgotPassword />
  </BrowserRouter>
)

describe('ForgotPassword', () => {
  test('renders the password reset form', () => {
    render(mockRouter);
    expect(screen.getByText('Password Reset')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset Password' })).toBeInTheDocument();
  });

  test('reset password button', async () => {
    render(mockRouter);
    const resetPasswordButton = screen.getByRole('button', { name: 'Reset Password' });
    await user.click(resetPasswordButton);
    expect(mockResetPassword).toHaveBeenCalled();
  });

  test('calls reset password with the email when the form is submitted & displays success message', async () => {
    const email = 'test@example.com';
    render(mockRouter);
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: 'Reset Password' });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.click(submitButton);
    expect(mockResetPassword).toHaveBeenCalledWith(email);
    await waitFor(() => {
      expect(screen.getByText('Check your inbox for further instructions')).toBeInTheDocument();
    });
  });

  test('renders error message when logout fails', async () => {
    mockResetPassword.mockImplementation(() => {
      throw new Error();
    });
    render(mockRouter);
    const resetPasswordButton = screen.getByRole('button', { name: 'Reset Password' });
    await user.click(resetPasswordButton);
    expect(screen.getByText('Failed to reset password')).toBeInTheDocument();
  });

  test('login button, redirects to login page', async () => {
    render(mockRouter);
    const loginButton = screen.getByRole('link', { name: 'Login'})
    await user.click(loginButton);
    expect(window.location.pathname).toBe('/login');
  });

  test('signup button, redirects to signup page', async () => {
    render(mockRouter);
    const signupButton = screen.getByRole('link', { name: 'Sign Up'})
    await user.click(signupButton);
    expect(window.location.pathname).toBe('/signup');
  });
});
