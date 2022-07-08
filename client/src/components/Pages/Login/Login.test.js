import React from 'react';
import "@testing-library/jest-dom";
import Login from './Login';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

describe('Login page', () => {
    
    it('should render', () => {
        render(<Login />);
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    })
    it('should inform the user login was unsuccessful if incorrect credentials are entered', async () => {
        const user = userEvent.setup();

        render(<Login />);

        const usernameInput = screen.getByLabelText("Username");
        const passwordInput = screen.getByLabelText("Password");
        const loginButton = screen.getByRole("button", { name: "Login" });

        await user.type(usernameInput, "fake_username");
        await user.type(passwordInput, "fake_password");
        await user.click(loginButton);

        expect(screen.getByText("A password is required")).toBeInTheDocument();

    })
})