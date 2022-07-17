import React from 'react';
import "@testing-library/jest-dom";
import Login from './Login';
import {render, screen} from '../../../setupTests';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

describe('Login page', () => {

    it('should render', () => {
        render(<Login />);
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    })

    it('should handle login successfully', async () => {
        const user = userEvent.setup();

        const mockedLogin = jest.fn();

        render(<Login />, {onLogin: mockedLogin});

        const usernameInput = screen.getByLabelText("Username");
        const passwordInput = screen.getByLabelText("Password");
        const loginButton = screen.getByRole("button", { name: "Login" });

        await user.type(usernameInput, "fake_username");
        await user.type(passwordInput, "fake_password");
        await user.click(loginButton);

        expect(mockedLogin).toHaveBeenCalledWith({"password": "fake_password", "username": "fake_username"});
    })

    // Would have added test here for unsuccessful login but as API call in useAuth and not component itself not possible here

})