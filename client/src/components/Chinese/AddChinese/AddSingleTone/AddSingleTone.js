import React, { useEffect } from 'react';
import { applyTone } from '../../../../helpers/pinyin';
import { TonePad } from '../TonePad/TonePad';
import AnimatedPinyin from '../AnimatedPinyin/AnimatedPinyin';
import AddSingleToneCSS from "./AddSingleTone.module.css";

export const AddSingleTone = props => {

    console.log('Hello from single tone');

    const {savedCharacter, savedReadings, savedTones, setTones, savedPinyin, setPinyin, nextCharacter, previousCharacter, nextStage, editingCharacter, index} = props;

    const constructTones = event => {
        const tone = event.target.value === savedTones[index] ? 0 : event.target.value;
        const firstSection = savedTones.slice(0, index);
        const secondSection = savedTones.slice(index + 1, savedTones.length);
        const newArray = firstSection.concat([tone], secondSection);
        setTones(newArray);
    };

    const constructPinyin = () => {
        const firstSection = savedPinyin.slice(0, index);
        const secondSection = savedPinyin.slice(index + 1, savedPinyin.length);
        const newArray = firstSection.concat([applyTone(savedReadings[index], savedTones[index])], secondSection);
        setPinyin(newArray);
    };

    useEffect(() =>{
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
    };

    const handleToneClick = event => {
        constructTones(event);
    }

    return (
        <div className={AddSingleToneCSS.singleToneEdit}>
            <AnimatedPinyin animationPlayed={false} pinyin={savedPinyin[index]} tone={parseInt(savedTones[index])} pinyinStyles={null} pinyinDelay={null} />
            <div className={AddSingleToneCSS.container}>
                <div className={AddSingleToneCSS.crossContainer}>
                    <div className={AddSingleToneCSS.horizontalLine} />
                    <div className={AddSingleToneCSS.verticalLine} />
                </div>
                <h1>{savedCharacter}</h1>
                <TonePad handleToneClick={handleToneClick} savedTone={parseInt(savedTones[index])} />
            </div>
            <div className={AddSingleToneCSS.nextButtonContainer}>
                {editingCharacter > 0 && <button onClick={previousCharacter}>Back</button>}
                <button onClick={handleClickNext}>Next</button>
            </div>
        </div>
    )
};

export default AddSingleTone;
