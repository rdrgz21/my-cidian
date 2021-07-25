import React, {useEffect, useState} from 'react';
import AddSingleTone from '../AddSingleTone/AddSingleTone';
import AddTonesCSS from "./AddTones.module.css";

export const AddTones = props => {

    const {savedCharacters, savedTones, savedReadings, setTones, savedPinyin, setPinyin, nextStage} = props;

    const [editingCharacter, setEditingCharacter] = useState(0);

    const nextCharacter = () => setEditingCharacter(editingCharacter + 1);

    const previousCharacter = () => setEditingCharacter(editingCharacter - 1);

    useEffect(()=>setPinyin(savedReadings), []);

    return (
        <div className={AddTonesCSS.container}>
            {editingCharacter + 1}
            {savedCharacters.map((character, index)=> index === editingCharacter && (<AddSingleTone savedCharacter={savedCharacters[index]} savedReadings={savedReadings} savedTones={savedTones} setTones={setTones} savedPinyin={savedPinyin} setPinyin={setPinyin} nextCharacter={nextCharacter} previousCharacter={previousCharacter} nextStage={nextStage} index={index} key={index} />))}
       </div>
    )
};

export default AddTones;
