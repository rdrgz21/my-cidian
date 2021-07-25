import React, {useState} from 'react';
import AddSingleReadingCSS from "./AddSingleReading.module.css";

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
        // save reading to savedReadings array
        constructReadings();
        nextCharacter();
        if (index === savedReadings.length-1) {
            console.log('Last character');
            nextStage();
        }
    } 

    return (
        <div className={AddSingleReadingCSS.singleCharacterEdit}>
            <h1>{savedCharacter}</h1>
            <input onChange={handleChange} type='text' placeholder={savedReadings[index] ? savedReadings[index] : 'Add reading'} value={input}/>
            <div>
                {editingCharacter > 0 && <button onClick={previousCharacter}>Back</button>}
                <button onClick={handleClick}>Next</button>
            </div>
        </div>
    )
};

export default AddSingleReading;
