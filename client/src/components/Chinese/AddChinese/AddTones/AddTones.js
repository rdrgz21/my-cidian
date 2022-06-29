import React, {useState, useContext} from 'react';
import AddSingleTone from '../AddSingleTone/AddSingleTone';
import AddTonesCSS from "./AddTones.module.css";
import StageBullets from '../StageBullets/StageBullets';
import { AddChineseContext} from '../AddChinese';

export const AddTones = () => {

    const {state} = useContext(AddChineseContext);

    const {characters} = state;

    const [editingCharacter, setEditingCharacter] = useState(0);

    const nextCharacter = () => setEditingCharacter(editingCharacter + 1);

    const previousCharacter = () => setEditingCharacter(editingCharacter - 1);

    return (
        <div className={AddTonesCSS.container}>
            {characters.map((character, index) => index === editingCharacter && (<AddSingleTone nextCharacter={nextCharacter} previousCharacter={previousCharacter} index={index} key={index} />))}
            <StageBullets editingCharacter={editingCharacter} />
       </div>
    )
};

export default AddTones;
