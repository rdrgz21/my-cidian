import React, {createContext, useState, useReducer} from 'react';
import axios from 'axios';
import AddChineseCSS from "./AddChinese.module.css";
import AddZhEn from './AddZhEn/AddZhEn';
import AddReadings from './AddReadings/AddReadings';
import AddTones from './AddTones/AddTones';
import Review from './Review/Review';
import StageBar from './StageBar/StageBar';
import { useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export const AddChineseContext = createContext();

const initialState = {
    chinese: '',
    english: '',
    characters: [],
    readings: [],
    tones: [],
    pinyin: [],
    stage: 1,
    stageReached: 1,
    isEditing: false
}

export const CHINESE_ACTIONS = {
    SET_CHINESE: 'UPDATE_CHINESE',
    SET_ENGLISH: 'SET_ENGLISH',
    SET_CHARACTERS: 'SET_CHARACTERS',
    SET_READINGS: 'SET_READINGS',
    SET_TONES: 'SET_TONES',
    SET_PINYIN: 'SET_PINYIN',
    NEXT_STAGE: 'NEXT_STAGE',
    PREV_STAGE: 'PREV_STAGE',
    SET_STAGE: 'SET_STAGE',
    RESET: 'RESET',
    SET_TONES_AND_PINYIN: 'SET_TONES_AND_PINYIN'
}

const reducer = (state, action) => {
    switch (action.type) {
        case CHINESE_ACTIONS.SET_CHINESE:
            return {...state, chinese: action.payload}; 
        case CHINESE_ACTIONS.SET_ENGLISH:
            return {...state, english: action.payload}; 
        case CHINESE_ACTIONS.SET_CHARACTERS:
            return {...state, characters: action.payload};
        case CHINESE_ACTIONS.SET_READINGS:
            return {...state, readings: action.payload}; 
        case CHINESE_ACTIONS.SET_TONES:
            return {...state, tones: action.payload}; 
        case CHINESE_ACTIONS.SET_PINYIN:
            return {...state, pinyin: action.payload}; 
        case CHINESE_ACTIONS.NEXT_STAGE:
            return nextStage(state);
        case CHINESE_ACTIONS.PREV_STAGE:
            return {...state, stage: state.stage - 1};
        case CHINESE_ACTIONS.SET_STAGE:
            return {...state, stage: action.payload}
        case CHINESE_ACTIONS.RESET:
            return {...initialState};
        case CHINESE_ACTIONS.SET_TONES_AND_PINYIN:
            return {...state, tones: action.payload.tones, pinyin: action.payload.pinyin};
        default:
            return state;    

    }
}

const nextStage = (state) => {
    if (state.stage < 4) {
        return {...state, stage: state.stage+1, stageReached: state.stageReached === state.stage ? state.stageReached + 1 : state.stageReached}
    } else {
        return initialState;
    }
};

export const AddChinese = () => {
    const { user } = useAuth();
    const location = useLocation();
    const editWordState = location.state ? location.state.wordToEdit : null;

    const [state, dispatch] = useReducer(reducer, editWordState ? editWordState : initialState);

    const {chinese, characters, readings, pinyin, tones, english, stage, isEditing, id} = state;

    // Send to DB

    const [message, setMessage] = useState(' ');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newVocab = {
            chinese: chinese,
            characters: characters,
            readings: readings,
            pinyin: pinyin,
            tones: tones,
            english: english,
            user: user
        };

        if (message === 'New vocab added' || message === "Sorry, you've already saved this word!") {
            setMessage(' ');
            dispatch({type: CHINESE_ACTIONS.RESET});
        }

        if (isEditing) {
            const response = await axios.patch(`/api/vocab/zh/${id}`, newVocab, {
                header: {
                    'Content-Type': 'application/json'
                }
            });
    
            setMessage(response.data.message);
        } else {
            const response = await axios.post('/api/vocab/zh', newVocab, {
                header: {
                    'Content-Type': 'application/json'
                }
            });
    
            setMessage(response.data.message);
        }
    };

    const generateComponentByStage = stage => {
        switch (stage) {
            case 1:
                return <AddZhEn />;
            case 2:
                return <AddReadings />
            case 3:
                return <AddTones />
            case 4:
                return <Review message={message} setMessage={setMessage} handleSubmit={handleSubmit} />
            default:
                return null;
        }
    }

    return (
        <AddChineseContext.Provider value={{state: state, dispatch: dispatch}}>
            <div className={AddChineseCSS.container}>
                <StageBar />
                {generateComponentByStage(stage)}
            </div>
        </AddChineseContext.Provider>
    )
};

export default AddChinese;
