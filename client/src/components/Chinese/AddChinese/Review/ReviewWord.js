import React from 'react';
import ReviewWordCSS from './ReviewWord.module.css';
import IndivCharReview from '../IndivCharReview/IndivCharReview';

const ReviewWord = ({animationPlayed, wordData, is}) => {
    const {characters, pinyin, english, tones} = wordData;
    console.log(wordData);

    const showIndivCharReview = () => {
        return characters.map((character, index) => (<IndivCharReview animationPlayed={animationPlayed} savedCharacter={character} savedPinyin={pinyin[index]} tone={tones[index]} wordLength={characters.length} index={index} key={index} />))
    }

    return (
        <>
            <div className={ReviewWordCSS.container}>
                {showIndivCharReview()}
            </div>
            <h2 className={ReviewWordCSS.english}>{english}</h2>
        </>
    )
}

export default ReviewWord;
