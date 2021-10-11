import React from 'react';
import IndivCharReviewCSS from "./IndivCharReview.module.css";
import AnimatedPinyin from '../AnimatedPinyin/AnimatedPinyin';

export const IndivCharReview = props => {

    const {savedCharacter, savedPinyin, wordLength, tone, index, animationPlayed} = props;

    const charWidthStyles = {fontSize: `${97.6/wordLength}vw`};

    const pinyinStyles = {fontSize: `${97.6/wordLength/5}vw`};

    const pinyinDelay = {animationDelay: `${0.4*index}s`};

    const containerWidth = {width: `${100/wordLength}%`};

    return (
        <div className={IndivCharReviewCSS.container} style={containerWidth}>
            <AnimatedPinyin animationPlayed={animationPlayed} pinyin={savedPinyin} tone={tone} pinyinStyles={pinyinStyles} pinyinDelay={pinyinDelay} />
            <h1 style={charWidthStyles}>{savedCharacter}</h1>
       </div>
    )
};

export default IndivCharReview;
