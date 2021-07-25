import React, { useEffect } from 'react';
import { applyTone } from '../../../../helpers/pinyin';
import AddSingleToneCSS from "./AddSingleTone.module.css";

export const AddSingleTone = props => {

    const {savedCharacter, savedReadings, savedTones, setTones, savedPinyin, setPinyin, nextCharacter, previousCharacter, nextStage, index} = props;

    const constructTones = event => {
        const tone = event.target.value === savedTones[index] ? 0 : event.target.value;
        const firstSection = savedTones.slice(0, index);
        const secondSection = savedTones.slice(index + 1, savedTones.length);
        const newArray = firstSection.concat([tone], secondSection);
        setTones(newArray);
    };

    const constructPinyin = () => {
        console.log('Constructing pinyin');
        const firstSection = savedPinyin.slice(0, index);
        const secondSection = savedPinyin.slice(index + 1, savedPinyin.length);
        const newArray = firstSection.concat([applyTone(savedReadings[index], savedTones[index])], secondSection);
        setPinyin(newArray);
    };

    useEffect(()=>{
        constructPinyin();
    }, [savedTones[index]]);

    const handleClickNext = event => {
        event.preventDefault();
        // save reading to savedReadings array
        // constructPinyin();
        nextCharacter();
        if (index === savedReadings.length-1) {
            nextStage();
        }
    } 

    return (
        <div className={AddSingleToneCSS.singleToneEdit}>
            <button onClick={previousCharacter}>Back</button>
            <hr />
            <p>{savedPinyin[index]}</p>
            <p>{savedCharacter}</p>
            <button onClick={constructTones} value={1}>1</button>
            <button onClick={constructTones} value={2}>2</button>
            <button onClick={constructTones} value={3}>3</button>
            <button onClick={constructTones} value={4}>4</button>
            <hr />
            <button onClick={handleClickNext}>Next</button>
            
        </div>
    )
};

export default AddSingleTone;
