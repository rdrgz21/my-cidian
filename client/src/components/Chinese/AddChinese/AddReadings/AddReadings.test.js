import React from 'react';
import "@testing-library/jest-dom";
import AddReadings from './AddReadings';
import {render, screen} from '../../../../setupTests';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

describe('AddReadings component', () => {

    const mockedDispatch = jest.fn();

    const mockInitialContext = {
        state: {
            chinese: '',
            english: '',
            characters: ["你","好"],
            readings: ["",""],
            tones: [],
            pinyin: ["",""],
            stage: 1,
            stageReached: 1,
            isEditing: false
        },
        dispatch: mockedDispatch
    }

    it('should render', () => {

        render(<AddReadings />, mockInitialContext);

        expect(screen.getByText(/你/i)).toBeInTheDocument();
        expect(screen.getByText(/Reading/i)).toBeInTheDocument();
    });

    it('should display the second character after a valid reading for the first has been input', async () => {
        const user = userEvent.setup();

        render(<AddReadings />, mockInitialContext);

        const readingInput = screen.getByLabelText("Reading");
        const nextButton = screen.getByRole("button", { name: "Next" });

        await user.type(readingInput, 'ni');
        await user.click(nextButton);
        
        expect(screen.getByText(/好/i)).toBeInTheDocument();
    })
});
