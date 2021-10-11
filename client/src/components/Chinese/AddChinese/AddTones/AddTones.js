import React, {useEffect, useState} from 'react';
import AddSingleTone from '../AddSingleTone/AddSingleTone';
import AddTonesCSS from "./AddTones.module.css";
import StageBullets from '../StageBullets/StageBullets';

export const AddTones = props => {

    const {savedCharacters, savedTones, savedReadings, setTones, savedPinyin, setPinyin, nextStage} = props;

    // TODO: FIX -Something about way the AddSingleTone is being rendered with functions defined here is causing this component to be rerendered unnecessarily

    const [editingCharacter, setEditingCharacter] = useState(0);

    const nextCharacter = () => setEditingCharacter(editingCharacter + 1);

    const previousCharacter = () => setEditingCharacter(editingCharacter - 1);

    useEffect(()=>setPinyin(savedReadings), []);

    console.log('Hello from add tone');

    return (
        <div className={AddTonesCSS.container}>
            {savedCharacters.map((character, index)=> index === editingCharacter && (<AddSingleTone savedCharacter={savedCharacters[index]} savedReadings={savedReadings} savedTones={savedTones} setTones={setTones} savedPinyin={savedPinyin} setPinyin={setPinyin} nextCharacter={nextCharacter} previousCharacter={previousCharacter} nextStage={nextStage} editingCharacter={editingCharacter} index={index} key={index} />))}
            <StageBullets savedCharacters={savedCharacters} editingCharacter={editingCharacter} />
       </div>
    )
};

export default AddTones;
