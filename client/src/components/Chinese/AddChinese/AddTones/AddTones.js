import React, {useEffect, useState, useContext} from 'react';
import AddSingleTone from '../AddSingleTone/AddSingleTone';
import AddTonesCSS from "./AddTones.module.css";
import StageBullets from '../StageBullets/StageBullets';
import { AddChineseContext, CHINESE_ACTIONS } from '../AddChinese';

export const AddTones = () => {

    const {state, dispatch} = useContext(AddChineseContext);

    const {characters, readings, isEditing} = state;

    const [editingCharacter, setEditingCharacter] = useState(0);

    const nextCharacter = () => setEditingCharacter(editingCharacter + 1);

    const previousCharacter = () => setEditingCharacter(editingCharacter - 1);

    useEffect(() => {
        if (!isEditing) {
            dispatch({type: CHINESE_ACTIONS.SET_PINYIN, payload: readings})
        }
    }, [isEditing, readings, dispatch]);
    
    return (
        <div className={AddTonesCSS.container}>
            {characters.map((character, index) => index === editingCharacter && (<AddSingleTone nextCharacter={nextCharacter} previousCharacter={previousCharacter} index={index} key={index} />))}
            <StageBullets editingCharacter={editingCharacter} />
       </div>
    )
};

export default AddTones;
