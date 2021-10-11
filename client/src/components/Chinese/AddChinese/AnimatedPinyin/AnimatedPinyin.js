import React from 'react';
import AnimatedPinyinCSS from "./AnimatedPinyin.module.css";

export const AnimatedPinyin = props => {

    const {pinyin, tone, pinyinStyles, pinyinDelay, animationPlayed} = props;

    const getToneStyles = tone => {
        switch(parseInt(tone)) {
            case 0:
                return AnimatedPinyinCSS.tone0;
            case 1:
                return AnimatedPinyinCSS.tone1;
            case 2:
                return AnimatedPinyinCSS.tone2;
            case 3:
                return AnimatedPinyinCSS.tone3;
            case 4:
                return AnimatedPinyinCSS.tone4;
            default:
                return AnimatedPinyinCSS.tone0;
        }
    }

    return (
        <div className={AnimatedPinyinCSS.container} style={pinyinStyles}>
            <p className={!animationPlayed ? getToneStyles(tone) : undefined} style={pinyinDelay}>{pinyin}</p>
       </div>
    )
};

export default AnimatedPinyin;
