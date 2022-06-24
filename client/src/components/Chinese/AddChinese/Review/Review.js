import React, {useState, useEffect, useContext, useCallback} from 'react';
import ReviewCSS from "./Review.module.css";
import IndivCharReview from '../IndivCharReview/IndivCharReview';
import { AddChineseContext } from '../AddChinese';

export const Review = props => {

    const {message, setMessage, handleSubmit} = props; 

    const {state} = useContext(AddChineseContext);

    const {characters, pinyin, meaning, tones} = state;

    const [animationPlayed, setAnimationPlayed] = useState(false);

    // Unsure how this is working with useCallback, but seemed to fix issue with useEffect re: missing dependency
    const setAnimationPlayedTrue = useCallback(() => {
        setTimeout(() => setAnimationPlayed(true), characters.length * 700);
    }, [characters.length]);

    const resetAnimation = () => {
        animationPlayed && setAnimationPlayed(false, setAnimationPlayedTrue());
    }

    useEffect(() => {
        setAnimationPlayedTrue();
        
        return setMessage('');
    }, [setAnimationPlayedTrue, setMessage]);

    const showIndivCharReview = () => {
        return characters.map((character, index) => (<IndivCharReview animationPlayed={animationPlayed} savedCharacter={character} savedPinyin={pinyin[index]} tone={tones[index]} wordLength={characters.length} index={index} key={index} />))
    }
    
    return (
        <div className={ReviewCSS.container}>
            <div className={ReviewCSS.charactersContainer}>
                {showIndivCharReview()}
            </div>
            <h2>{meaning}</h2>
            <button onClick={resetAnimation}>Replay</button>
            <button onClick={handleSubmit}>Save</button>
            <p>{message}</p>
       </div>
    )
};

export default Review;
