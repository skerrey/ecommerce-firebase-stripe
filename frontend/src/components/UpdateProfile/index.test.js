// Description: Tests for UpdateProfile component

import UpdateProfile from './index';
import { fireEvent, render, screen, act } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

const user = userEvent.setup();
const mockUpdateEmail = jest.fn();
const mockUpdatePassword = jest.fn();
const mockUpdateInfo = jest.fn();
const mockNavigate = jest.fn();

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => {
    return {  
      currentUser: {
        displayName: 'John Doe',
        email: 'test@example.com',
      },
      updateEmail: mockUpdateEmail,
      updatePassword: mockUpdatePassword,
      updateInfo: mockUpdateInfo,
    }
  }
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockRouter = (
  <BrowserRouter>
    <UpdateProfile />
  </BrowserRouter>
)

describe('UpdateProfile', () => {
  test('renders the update profile form', async () => {
    render(mockRouter);
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Password Confirmation')).toBeInTheDocument();
    expect(screen.getByText('Update')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('calls update functions and navigates to home page on form submission', async () => {
    render(mockRouter);
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const passwordConfirmInput = screen.getByLabelText('Password Confirmation');
    const updateButton = screen.getByRole('button', { name: 'Update' });

    await user.clear(firstNameInput);
    await user.type(firstNameInput, 'Jane');
    await user.clear(lastNameInput);
    await user.type(lastNameInput, 'Doe');
    await user.clear(emailInput);
    await user.type(emailInput, 'janedoe@example.com');
    await user.clear(passwordInput);
    await user.type(passwordInput, 'newpassword');
    await user.clear(passwordConfirmInput);
    await user.type(passwordConfirmInput, 'newpassword');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(updateButton);
    });

    await expect(mockUpdateInfo).toHaveBeenCalledWith('Jane Doe');
    await expect(mockUpdateEmail).toHaveBeenCalledWith('janedoe@example.com');
    await expect(mockUpdatePassword).toHaveBeenCalledWith('newpassword');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('cancel button, redirects to dashboard page', async () => {
    render(mockRouter);
    const cancelButton = screen.getByRole('link', { name: 'Cancel'})
    await user.click(cancelButton);
    expect(window.location.pathname).toBe('/dashboard');
  });

  test('if passwords do not match displays an error message', () => {
    render(mockRouter);
    const passwordInput = screen.getByLabelText('Password');
    const passwordConfirmInput = screen.getByLabelText('Password Confirmation');
    const updateButton = screen.getByRole('button', { name: 'Update' });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'password456' } });
    fireEvent.click(updateButton);
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });
});
