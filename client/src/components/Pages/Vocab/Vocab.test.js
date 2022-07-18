import React from 'react';
import "@testing-library/jest-dom";
import Vocab from './Vocab';
import {render, screen} from '../../../setupTests';
import '@testing-library/jest-dom/extend-expect';

describe('Vocab page', () => {

    it('should render with the loading text', async () => {
        render(<Vocab />);
        expect(await screen.findByText(/loading.../i)).toBeInTheDocument();
    })

    it('should display a list of vocabulary items once it has fetched', async () => {
        render(<Vocab />, {user: 'test_user'});

        expect(await screen.findByText(/你好嗎/i)).toBeInTheDocument();
        expect(await screen.findByText(/再見/i)).toBeInTheDocument();
    });
})