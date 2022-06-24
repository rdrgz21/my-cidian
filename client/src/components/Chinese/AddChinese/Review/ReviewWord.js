import React from 'react';
import ReviewWordCSS from './ReviewWord.module.css';
import IndivCharReview from '../IndivCharReview/IndivCharReview';
import axios from 'axios';

const ReviewWord = ({animationPlayed, wordData, openCloseReviewWord, isSavedWord = false}) => {
    const {id, characters, pinyin, english, tones} = wordData;
    
    const showIndivCharReview = () => {
        return characters.map((character, index) => (<IndivCharReview animationPlayed={animationPlayed} savedCharacter={character} savedPinyin={pinyin[index]} tone={tones[index]} wordLength={characters.length} index={index} key={index} />))
    }

    const deleteWord = async (e) => {
        console.log('Deleting word');
        e.stopPropagation();
        try {
            const res = await axios.delete(`/api/vocab/zh/${id}`);
            console.log(res);
            console.log(res.data.message);
        } catch (error) {
            console.error(error);
        }
        openCloseReviewWord();
    };

    return (
        <>
            <div className={ReviewWordCSS.container}>
                {showIndivCharReview()}
            </div>
            <h2 className={ReviewWordCSS.english}>{english}</h2>
            {isSavedWord &&
                <div className={ReviewWordCSS.buttonContainer}>
                    <button>Edit</button>
                    <button onClick={(e) => deleteWord(e)}>Delete</button>
                </div>
            }
            
        </>
    )
}

export default ReviewWord;
