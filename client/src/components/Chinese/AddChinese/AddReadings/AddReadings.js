import React, {useContext, useState} from 'react';
import AddReadingsCSS from "./AddReadings.module.css";
import AddSingleReading from '../AddSingleReading/AddSingleReading';
import StageBullets from '../StageBullets/StageBullets';
import { AddChineseContext } from '../AddChinese';

export const AddReadings = () => {

    const {state} = useContext(AddChineseContext);

    const {characters} = state;

    const [editingCharacter, setEditingCharacter] = useState(0);

    const nextCharacter = () => setEditingCharacter(editingCharacter + 1);

    const previousCharacter = () => setEditingCharacter(editingCharacter - 1);

    return (
        <div className={AddReadingsCSS.container}>
            {characters.map((character, index) => index === editingCharacter && (<AddSingleReading nextCharacter={nextCharacter} previousCharacter={previousCharacter} index={index} key={index} />))}
            <StageBullets editingCharacter={editingCharacter} />
       </div>
    )
};

export default AddReadings;
