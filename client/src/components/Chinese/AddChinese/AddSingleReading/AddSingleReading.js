import React, {useContext, useState} from 'react';
import AddSingleReadingCSS from "./AddSingleReading.module.css";
import Input from '../../../General/Input/Input';
import { AddChineseContext } from '../AddChinese';
import {CHINESE_ACTIONS} from '../AddChinese'
;
import StyledButton from '../../../General/StyledButton/StyledButton';
import useInputValidation from '../../../../hooks/useInputValidation';
import { validPinyinRegex } from '../../../../helpers/pinyin';

export const AddSingleReading = props => {
    const {state, dispatch} = useContext(AddChineseContext);
    const {nextCharacter, previousCharacter, index} = props;
    const {readings, characters} = state;
    const [input, setInput] = useState(readings[index]);
    const [message, setMessage] = useState('');

    const {isValidInput} = useInputValidation(validPinyinRegex, input);

    const constructReadings = () => {
        const firstSection = readings.slice(0, index);
        const secondSection = readings.slice(index + 1, readings.length);
        const newArray = firstSection.concat([input], secondSection);
        dispatch({type: CHINESE_ACTIONS.SET_READINGS, payload: newArray});
    };

    const handleChange = event => {
        setMessage('');
        setInput(event.target.value);
    }

    const handleClick = event => {
        event.preventDefault();

        if (!isValidInput) {
            setMessage('Please enter a valid reading');
            return;
        }
        constructReadings();
        nextCharacter();
        if (index === readings.length - 1) {
            dispatch({type: CHINESE_ACTIONS.NEXT_STAGE});
        }
    } 

    return (
        <div className={AddSingleReadingCSS.singleCharacterEdit}>
            <h1>{characters[index]}</h1>
            <form>
                <Input placeholder='Reading' handleChange={handleChange} name='reading' value={input} isInputValid={isValidInput} />
                <div>
                    {index > 0 && <StyledButton onClick={previousCharacter} type='button'>Back</StyledButton>}
                    <StyledButton onClick={handleClick} type='submit'>Next</StyledButton>
                </div>
            </form>
            {/* TODO: add tooltip */}
            <p>{message}</p>
        </div>
    )
};

export default AddSingleReading;
