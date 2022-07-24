import '@testing-library/jest-dom';
import {server} from './mocks/server';
import React from 'react';
import { render } from '@testing-library/react';
import { AuthContext } from './components/General/AuthProvider/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { AddChineseContext } from './components/Chinese/AddChinese/AddChinese';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const AllTheProviders = ({ children, customContext }) => (
    <BrowserRouter>
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
            {/* value - how mock state and dispatch? */}
            <AddChineseContext.Provider
                value={{
                    state: {
                        chinese: '',
                        english: '',
                        characters: [],
                        readings: [],
                        tones: [],
                        pinyin: [],
                        stage: 1,
                        stageReached: 1,
                        isEditing: false,
                    },
                    dispatch: jest.fn(),
                    ...customContext
                }}
            >
                {children}
            </AddChineseContext.Provider>
        </AuthContext.Provider>
    </BrowserRouter>
);

const customRender = (ui, customContext, options) =>
    /* eslint-disable react/display-name */
    render(ui, { wrapper: () => <AllTheProviders customContext={customContext}>{ui}</AllTheProviders>, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };