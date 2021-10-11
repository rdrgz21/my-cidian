import React, {useState, useEffect} from 'react';
import ReviewCSS from "./Review.module.css";
import IndivCharReview from '../IndivCharReview/IndivCharReview';

export const Review = props => {

    const [animationPlayed, setAnimationPlayed] = useState(false);

    const setAnimationPlayedTrue = () => {
        setTimeout(() => setAnimationPlayed(true), savedCharacters.length * 700);
    };

    const resetAnimation = () => {
        animationPlayed && setAnimationPlayed(false, setAnimationPlayedTrue());
    }

    useEffect(() => {
        setAnimationPlayedTrue();
    }, []);

    const {savedCharacters, savedPinyin, savedMeaning, savedTones} = props; 

    const showIndivCharReview = () => {
        return savedCharacters.map((character, index) => (<IndivCharReview animationPlayed={animationPlayed} savedCharacter={character} savedPinyin={savedPinyin[index]} tone={savedTones[index]} wordLength={savedCharacters.length} index={index} key={index} />))
    }
    
    return (
        <div className={ReviewCSS.container}>
            <div className={ReviewCSS.charactersContainer}>
                {showIndivCharReview()}
            </div>
            <h2>{savedMeaning}</h2>
            <button onClick={resetAnimation}>Replay</button>
       </div>
    )
};

export default Review;
