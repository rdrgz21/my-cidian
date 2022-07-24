import React from 'react';
import {useNavigate} from 'react-router-dom';
import ReviewWordCSS from './ReviewWord.module.css';
import IndivCharReview from '../IndivCharReview/IndivCharReview';
import axios from 'axios';
import StyledButton from '../../../General/StyledButton/StyledButton';

export const showIndivCharReview = (charactersArray, pinyinArray, tonesArray, animationPlayed) => {
    return charactersArray.map((character, index) => (<IndivCharReview animationPlayed={animationPlayed} savedCharacter={character} savedPinyin={pinyinArray[index]} tone={tonesArray[index]} index={index} key={index} />))
}

const ReviewWord = ({animationPlayed, wordData, openCloseReviewWord, isSavedWord = false}) => {
    const navigate = useNavigate();

    const {id, characters, readings, pinyin, english, tones, zh} = wordData;

    const deleteWord = async (e) => {
        e.stopPropagation();
        try {
            await axios.delete(`/api/vocab/zh/${id}`);
        } catch (error) {
            console.error(error);
        }
        openCloseReviewWord();
    };

    const editWordState = {
            id: id,
            chinese: zh,
            english: english,
            characters: characters,
            readings: readings,
            tones: tones,
            pinyin: pinyin,
            stage: 1,
            stageReached: 4,
            isEditing: true
    }

    const editWord = async (e) => {
        e.stopPropagation();
        navigate('/editvocab',
            {state: {
                wordToEdit: editWordState
            }}
        );
    };

    const charWidthStyles = {fontSize: `min(${50/characters.length}vw, 10vh`};

    return (
        <>
            <div className={ReviewWordCSS.container} style={charWidthStyles}>
                {showIndivCharReview(characters, pinyin, tones, animationPlayed)}
            </div>
            <h2 className={ReviewWordCSS.english}>{english}</h2>
            {isSavedWord &&
                <div className={ReviewWordCSS.buttonContainer}>
                    <StyledButton onClick={(e) => editWord(e)}>Edit</StyledButton>
                    <StyledButton onClick={(e) => deleteWord(e)}>Delete</StyledButton>
                </div>
            }
            
        </>
    )
}

export default ReviewWord;
