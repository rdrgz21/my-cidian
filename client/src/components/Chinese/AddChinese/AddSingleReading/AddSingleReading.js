import React, {useContext, useState} from 'react';
import AddSingleReadingCSS from "./AddSingleReading.module.css";
import Input from '../../../General/Input/Input';
import { AddChineseContext } from '../AddChinese';
import {CHINESE_ACTIONS} from '../AddChinese'
;
export const AddSingleReading = props => {

    const {nextCharacter, previousCharacter, index} = props;

    const [input, setInput] = useState('');

    const {state, dispatch} = useContext(AddChineseContext);

    const {readings, characters} = state;

    const constructReadings = () => {
        const firstSection = readings.slice(0, index);
        const secondSection = readings.slice(index + 1, readings.length);
        const newArray = firstSection.concat([input], secondSection);
        dispatch({type: CHINESE_ACTIONS.SET_READINGS, payload: newArray});
    };

    const handleChange = event => {
        setInput(event.target.value);
    }

    const handleClick = event => {
        event.preventDefault();
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
                <Input placeholder='Reading' handleChange={handleChange} name='reading' value={input} />
                <div>
                    {index > 0 && <button onClick={previousCharacter} type='button'>Back</button>}
                    <button onClick={handleClick} type='submit'>Next</button>
                </div>
            </form>
        </div>
    )
};

export default AddSingleReading;
