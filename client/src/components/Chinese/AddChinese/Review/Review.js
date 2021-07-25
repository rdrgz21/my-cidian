import React from 'react';
import ReviewCSS from "./Review.module.css";
import IndivCharReview from '../IndivCharReview/IndivCharReview';

export const Review = props => {

    const {savedCharacters, savedPinyin, savedMeaning} = props;    

    return (
        <div className={ReviewCSS.container}>
            <div className={ReviewCSS.charactersContainer}>
                {savedCharacters.map((character, index) => (<IndivCharReview savedCharacter={character} savedPinyin={savedPinyin[index]} key={index} />))}
            </div>
            <h2>{savedMeaning}</h2>
       </div>
    )
};

export default Review;
