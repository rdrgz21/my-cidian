import React, {useState, useEffect, useContext, useCallback} from 'react';
import ReviewCSS from "./Review.module.css";

import ReviewWord from './ReviewWord';
import { AddChineseContext } from '../AddChinese';

export const Review = props => {

    const {message, setMessage, handleSubmit} = props; 

    const {state} = useContext(AddChineseContext);

    const {characters} = state;

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

    return (
        <div className={ReviewCSS.container}>
            <ReviewWord animationPlayed={animationPlayed} wordData={state} />
            <button onClick={resetAnimation}>Replay</button>
            <button onClick={handleSubmit}>Save</button>
            <p>{message}</p>
       </div>
    )
};

export default Review;
