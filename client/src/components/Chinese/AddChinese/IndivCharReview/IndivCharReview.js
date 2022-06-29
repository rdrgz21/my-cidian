import React from 'react';
import IndivCharReviewCSS from "./IndivCharReview.module.css";
import AnimatedPinyin from '../AnimatedPinyin/AnimatedPinyin';

export const IndivCharReview = props => {

    const {savedCharacter, savedPinyin, tone, index, animationPlayed} = props;

 const pinyinDelay = {animationDelay: `${0.5+(0.4*index)}s`};

    return (
        <div className={IndivCharReviewCSS.container}>
            <AnimatedPinyin animationPlayed={animationPlayed} pinyin={savedPinyin} tone={tone} pinyinDelay={pinyinDelay} />
            <h1>{savedCharacter}</h1>
       </div>
    )
};

export default IndivCharReview;
