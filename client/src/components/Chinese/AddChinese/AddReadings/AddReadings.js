import React, {useState} from 'react';
import AddReadingsCSS from "./AddReadings.module.css";
import AddSingleReading from '../AddSingleReading/AddSingleReading';

export const AddReadings = props => {

    const {savedCharacters, savedReadings, setReadings, nextStage} = props;

    const [editingCharacter, setEditingCharacter] = useState(0);

    const nextCharacter = () => setEditingCharacter(editingCharacter + 1);

    const previousCharacter = () => setEditingCharacter(editingCharacter - 1);

    return (
        <div className={AddReadingsCSS.container}>
            {editingCharacter + 1}
            {savedCharacters.map((character, index)=> index === editingCharacter && (<AddSingleReading savedCharacter={savedCharacters[index]} savedReadings={savedReadings} setReadings={setReadings} nextCharacter={nextCharacter} previousCharacter={previousCharacter} nextStage={nextStage} index={index} key={index} />))}
       </div>
    )
};

export default AddReadings;
