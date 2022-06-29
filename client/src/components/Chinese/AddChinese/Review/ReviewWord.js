import React from 'react';
import {useHistory} from 'react-router-dom';
import ReviewWordCSS from './ReviewWord.module.css';
import IndivCharReview from '../IndivCharReview/IndivCharReview';
import axios from 'axios';
import StyledButton from '../../../General/StyledButton/StyledButton';

const ReviewWord = ({animationPlayed, wordData, openCloseReviewWord, isSavedWord = false}) => {
    const history = useHistory();

    const {id, characters, readings, pinyin, english, tones, zh} = wordData;
    
    const showIndivCharReview = () => {
        return characters.map((character, index) => (<IndivCharReview animationPlayed={animationPlayed} savedCharacter={character} savedPinyin={pinyin[index]} tone={tones[index]} index={index} key={index} />))
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
        history.push({
            pathname: '/editvocab',
            state: {
                wordToEdit: editWordState
            }
        })
    };

    const charWidthStyles = {fontSize: `clamp(1px, ${50/characters.length}vw, 10vh`};

    return (
        <>
            <div className={ReviewWordCSS.container} style={charWidthStyles}>
                {showIndivCharReview()}
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
