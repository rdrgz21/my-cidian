import React, { useEffect, useContext } from 'react';
import { applyTone } from '../../../../helpers/pinyin';
import { TonePad } from '../TonePad/TonePad';
import AnimatedPinyin from '../AnimatedPinyin/AnimatedPinyin';
import AddSingleToneCSS from "./AddSingleTone.module.css";
import { CHINESE_ACTIONS, AddChineseContext } from '../AddChinese';
import StyledButton from '../../../General/StyledButton/StyledButton';

export const AddSingleTone = props => {

    const {state, dispatch} = useContext(AddChineseContext);

    const {readings, tones, pinyin, characters} = state;

    const {nextCharacter, previousCharacter, index} = props;

    const constructTones = event => {
        const tone = event.target.value === tones[index] ? 0 : event.target.value;
        const firstSection = tones.slice(0, index);
        const secondSection = tones.slice(index + 1, tones.length);
        const newArray = firstSection.concat([tone], secondSection);
        dispatch({type: CHINESE_ACTIONS.SET_TONES, payload: newArray});
    };

    const constructPinyin = () => {
        const firstSection = pinyin.slice(0, index);
        const secondSection = pinyin.slice(index + 1, pinyin.length);
        const newArray = firstSection.concat([applyTone(readings[index], tones[index])], secondSection);
        dispatch({type: CHINESE_ACTIONS.SET_PINYIN, payload: newArray});
    };

    useEffect(() =>{
        constructPinyin();
    }, [tones[index]]);

    const handleClickNext = event => {
        event.preventDefault();
        // save reading to savedReadings array
        // constructPinyin();
        nextCharacter();
        if (index === readings.length - 1) {
            dispatch({type: CHINESE_ACTIONS.NEXT_STAGE});
        }
    };

    const handleToneClick = event => {
        constructTones(event);
    }

    return (
        <div className={AddSingleToneCSS.singleToneEdit}>
            <AnimatedPinyin animationPlayed={false} pinyin={pinyin[index]} tone={parseInt(tones[index])} pinyinStyles={null} pinyinDelay={null} />
            <div className={AddSingleToneCSS.container}>
                <div className={AddSingleToneCSS.crossContainer}>
                    <div className={AddSingleToneCSS.horizontalLine} />
                    <div className={AddSingleToneCSS.verticalLine} />
                </div>
                <h1>{characters[index]}</h1>
                <TonePad handleToneClick={handleToneClick} savedTone={parseInt(tones[index])} />
            </div>
            <div className={AddSingleToneCSS.nextButtonContainer}>
                {index > 0 && <StyledButton onClick={previousCharacter}>Back</StyledButton>}
                <StyledButton onClick={handleClickNext}>Next</StyledButton>
            </div>
        </div>
    )
};

export default AddSingleTone;
