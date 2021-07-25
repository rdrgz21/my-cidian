import React from 'react';
import IndivCharReviewCSS from "./IndivCharReview.module.css";

export const IndivCharReview = props => {

    const {savedCharacter, savedPinyin} = props;

    return (
        <div className={IndivCharReviewCSS.container}>
            <p>{savedPinyin}</p>
            <h1>{savedCharacter}</h1>
       </div>
    )
};

export default IndivCharReview;
