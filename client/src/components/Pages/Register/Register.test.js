import React from 'react';
import "@testing-library/jest-dom";
import Register from './Register';
import {render, screen} from '../../../setupTests';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

describe('Register page', () => {

    it('should render', () => {
        render(<Register />);
        expect(screen.getByText(/register/i)).toBeInTheDocument();
    })

    it('should handle succesful registration', async () => {
        const user = userEvent.setup();

        render(<Register />);

        const usernameInput = screen.getByLabelText("Username");
        const emailInput = screen.getByLabelText("Email Address");
        const passwordInput = screen.getByLabelText("Password");
        const confirmPasswordInput = screen.getByLabelText("Confirm Password");
        const registerButton = screen.getByRole("button", { name: "Register" });

        await user.type(usernameInput, "fake_username");
        await user.type(emailInput, "fake_email@email.com");
        await user.type(passwordInput, "fake_password");
        await user.type(confirmPasswordInput, "fake_password");
        await user.click(registerButton);

        // await waitFor(() =>  expect(screen.getByText(/User successfully registered/i)).toBeInTheDocument());
        // or
        expect(await screen.findByText(/User successfully registered/i)).toBeInTheDocument();
        // findByText returns a promise so must be resolved first
    });

    it('should inform the user if the two passwords do not match', async () => {
        const user = userEvent.setup();

        render(<Register />);

        const usernameInput = screen.getByLabelText("Username");
        const emailInput = screen.getByLabelText("Email Address");
        const passwordInput = screen.getByLabelText("Password");
        const confirmPasswordInput = screen.getByLabelText("Confirm Password");
        const registerButton = screen.getByRole("button", { name: "Register" });

        await user.type(usernameInput, "fake_username");
        await user.type(emailInput, "fake_email@email.com");
        await user.type(passwordInput, "fake_password");
        await user.type(confirmPasswordInput, "fake_password2");
        await user.click(registerButton);

        expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
    })
})