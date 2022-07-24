import React from 'react';
import "@testing-library/jest-dom";
import AddSingleReading from './AddSingleReading';
import {render, screen} from '../../../../setupTests';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

describe('AddSingleReading component', () => {

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

    const mockFn = jest.fn();

    it('should render', () => {
        render(<AddSingleReading nextCharacter={mockFn} previousCharacter={mockFn} index={0} key={0} />, mockInitialContext);

        expect(screen.getByText(/你/i)).toBeInTheDocument();
        expect(screen.getByText(/Reading/i)).toBeInTheDocument();
    });

    it('should dispatch to the AddChinese context if the input reading is valid and go to next character', async () => {
        const user = userEvent.setup();

        render(<AddSingleReading nextCharacter={mockFn} previousCharacter={mockFn} index={0} key={0} />, mockInitialContext);

        const readingInput = screen.getByLabelText("Reading");
        const nextButton = screen.getByRole("button", { name: "Next" });

        await user.type(readingInput, 'ni');
        await user.click(nextButton);
        
        expect(mockedDispatch).toHaveBeenCalledWith({payload: ["ni",""], type: 'SET_READINGS'});
        expect(mockFn).toHaveBeenCalled();
    })
    it('should display the warning message if the input is invalid', async () => {
        const user = userEvent.setup();

        render(<AddSingleReading nextCharacter={mockFn} previousCharacter={mockFn} index={0} key={0} />, mockInitialContext);

        const readingInput = screen.getByLabelText("Reading");
        const nextButton = screen.getByRole("button", { name: "Next" });

        await user.type(readingInput, 'invalid');
        await user.click(nextButton);
        
        expect(screen.getByText(/Please enter a valid reading/i)).toBeInTheDocument();
    })
    
    it('should go onto the next stage of AddChinese (tones) if current character is last in context character array', async () => {
        const user = userEvent.setup();

        render(<AddSingleReading nextCharacter={mockFn} previousCharacter={mockFn} index={1} key={1} />, mockInitialContext);

        const readingInput = screen.getByLabelText("Reading");
        const nextButton = screen.getByRole("button", { name: "Next" });

        await user.type(readingInput, 'hao');
        await user.click(nextButton);
        
        expect(mockedDispatch).toHaveBeenCalledWith({payload: ["","hao"], type: 'SET_READINGS'});
        expect(mockedDispatch).toHaveBeenCalledWith({type: 'NEXT_STAGE'});
    })
});
