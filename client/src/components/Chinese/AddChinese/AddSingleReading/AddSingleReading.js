import React, {useState} from 'react';
import AddSingleReadingCSS from "./AddSingleReading.module.css";
import Input from '../../../General/Input/Input';

export const AddSingleReading = props => {

    const {savedCharacter, savedReadings, setReadings, nextCharacter, previousCharacter, nextStage, editingCharacter, index} = props;

    const [input, setInput] = useState('');

    const constructReadings = () => {
        const firstSection = savedReadings.slice(0, index);
        const secondSection = savedReadings.slice(index + 1, savedReadings.length);
        const newArray = firstSection.concat([input], secondSection);
        setReadings(newArray);
    };

    const handleChange = event => {
        setInput(event.target.value);
    }

    const handleClick = event => {
        event.preventDefault();
        constructReadings();
        nextCharacter();
        if (index === savedReadings.length-1) {
            nextStage();
        }
    } 

    return (
        <div className={AddSingleReadingCSS.singleCharacterEdit}>
            <h1>{savedCharacter}</h1>
            <form>
                <Input placeholder='Reading' handleChange={handleChange} name='reading' value={input} />
                <div>
                    {editingCharacter > 0 && <button onClick={previousCharacter} type='button'>Back</button>}
                    <button onClick={handleClick} type='submit'>Next</button>
                </div>
            </form>
        </div>
    )
};

export default AddSingleReading;
