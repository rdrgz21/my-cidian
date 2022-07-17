import '@testing-library/jest-dom';
import {server} from './mocks/server';
import React from 'react';
import { render } from '@testing-library/react';
import { AuthContext } from './components/General/AuthProvider/AuthProvider';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


const AllTheProviders = ({ children, customContext }) => (
    <AuthContext.Provider
        value={{
            user: '',
            setUser: () => null,
            message: '',
            setMessage: () => null,
            onLogin: () => null,
            onLogout: () => null,
            ...customContext
        }}
    >
       {children}
    </AuthContext.Provider>
);

const customRender = (ui, customContext, options) =>
    /* eslint-disable react/display-name */
    render(ui, { wrapper: () => <AllTheProviders customContext={customContext}>{ui}</AllTheProviders>, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };