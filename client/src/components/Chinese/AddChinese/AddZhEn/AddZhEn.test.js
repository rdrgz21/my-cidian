import React from 'react';
import "@testing-library/jest-dom";
import AddZhEn from './AddZhEn';
import {render, screen} from '../../../../setupTests';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

describe('AddZhEn component', () => {

    it('should render', () => {
        render(
            <AddZhEn />
        );

        expect(screen.getByText(/中文/i)).toBeInTheDocument();
        expect(screen.getByText(/English/i)).toBeInTheDocument();
    });

    it('should display "Please enter valid terms" message if input is invalid', async () => {
        const user = userEvent.setup();

        render(
            <AddZhEn />
        );

        const chineseInput = screen.getByText(/中文/i);
        const englishInput = screen.getByText(/English/i);
        const saveButton = screen.getByText(/Save/i);

        await user.type(chineseInput, 'English characters');
        await user.type(englishInput, '漢字');
        await user.click(saveButton);

        expect(await screen.findByText("Please enter valid terms")).toBeInTheDocument();
    })

    it('should dispatch to the AddChinese context if the input is valid', async () => {
        const user = userEvent.setup();

        const mockedDispatch = jest.fn()

        render(
            <AddZhEn />,
            {
                state: {
                    chinese: '',
                    english: '',
                    characters: [],
                    readings: [],
                    tones: [],
                    pinyin: [],
                    stage: 1,
                    stageReached: 1,
                    isEditing: false
                },
                dispatch: mockedDispatch
            }
        );

        const chineseInput = screen.getByLabelText("中文");
        const englishInput = screen.getByLabelText("English");
        const saveButton = screen.getByText(/Save/i);

        await user.type(chineseInput, '你好');
        await user.type(englishInput, 'hello');
        await user.click(saveButton);

        expect(mockedDispatch).toHaveBeenCalledWith({payload: ["你","好"], type: 'SET_CHARACTERS'});
        expect(mockedDispatch).toHaveBeenCalledWith({payload: ["",""], type: 'SET_READINGS'});
        expect(mockedDispatch).toHaveBeenCalledWith({payload: ["",""], type: 'SET_PINYIN'});
    })
});
