import React, {useState, useContext} from 'react';
import AddZhEnCSS from "./AddZhEn.module.css";
import Input from '../../../General/Input/Input';
import { AddChineseContext, CHINESE_ACTIONS } from '../AddChinese';
import StyledButton from '../../../General/StyledButton/StyledButton';
import useInputValidation from '../../../../hooks/useInputValidation';
import { removePunctuationFromChinese } from '../../../../helpers/pinyin';

const ArrayTypes = {
    READINGS: 'readings',
    TONES: 'tones',
    PINYIN: 'pinyin'
}

export const AddZhEn = () => {

    const {state, dispatch} = useContext(AddChineseContext);

    const {chinese, english, characters, readings, tones, pinyin, isEditing} = state;

    const [input, setInput] = useState({
        chinese: chinese,
        english: english
    });
    const [message, setMessage] = useState('');

    const chineseRegex = /^[ ，。！？\u3000\u3400-\u4DBF\u4E00-\u9FFF]{0,}$/
    const englishRegex = /^[A-Za-z0-9 _.,!?"’'/]{0,}$/

    const {isValidInput: isChineseInputValid} = useInputValidation(chineseRegex, input.chinese);
    const {isValidInput: isEnglishInputValid} = useInputValidation(englishRegex, input.english);


    const handleChange =  event => {
        setMessage('');
        const {name, value} = event.target;
        setInput(prevInput => ({...prevInput, [name]: value}));
    };

    const createBaseArrays = (string) => {

       const splitCharacters = removePunctuationFromChinese(string);
       dispatch({type: CHINESE_ACTIONS.SET_CHARACTERS, payload: splitCharacters});

        // If editing, need a function to map over new input and check if old characters array contains same character.
        // If so, will push the corresponding reading into the new readings array
        const restructureArrays = (character, arrayType) => {
            const characterIndex = characters.indexOf(character);

            if (arrayType === ArrayTypes.READINGS) {
                return characterIndex > -1 ?  readings[characterIndex] :  '';
            }
            if (arrayType === ArrayTypes.TONES) {
                return characterIndex > -1 ?  tones[characterIndex] :  0;
            }
            if (arrayType === ArrayTypes.PINYIN) {
                return characterIndex > -1 ?  pinyin[characterIndex] :  '';
            }
        }
        
        if (isEditing) {
            const newReadingsArray = splitCharacters.map((character) => restructureArrays(character, ArrayTypes.READINGS));
            const newPinyinArray = splitCharacters.map((character) => restructureArrays(character, ArrayTypes.PINYIN));
            const newTonesArray = splitCharacters.map((character) => restructureArrays(character, ArrayTypes.TONES));

            dispatch({type: CHINESE_ACTIONS.SET_READINGS, payload: newReadingsArray});
            dispatch({type: CHINESE_ACTIONS.SET_PINYIN, payload: newPinyinArray});
            dispatch({type: CHINESE_ACTIONS.SET_TONES, payload: newTonesArray});

            if (splitCharacters.length > characters.length) {
                dispatch({type: CHINESE_ACTIONS.TOGGLE_IS_EDITING});
            }

        } else {
            const emptyStringArray = new Array(splitCharacters.length).fill('');
            const emptyNumberArray = new Array(splitCharacters.length).fill(0);

            dispatch({type: CHINESE_ACTIONS.SET_READINGS, payload: emptyStringArray});
            dispatch({type: CHINESE_ACTIONS.SET_PINYIN, payload: emptyStringArray});
            dispatch({type: CHINESE_ACTIONS.SET_TONES, payload: emptyNumberArray});
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isChineseInputValid || !isEnglishInputValid) {
            setMessage('Please enter valid terms');
            return;
        }

        createBaseArrays(input.chinese);

        dispatch({type: CHINESE_ACTIONS.SET_CHINESE, payload: input.chinese});
        dispatch({type: CHINESE_ACTIONS.SET_ENGLISH, payload: input.english});
        dispatch({type: CHINESE_ACTIONS.NEXT_STAGE});
        
    };

    return (
        <div className={AddZhEnCSS.container}>
            <form className={AddZhEnCSS.form} onSubmit={handleSubmit}>
               <div className={AddZhEnCSS.inputContainer}>
                    <Input placeholder='中文' handleChange={handleChange} name='chinese' value={input.chinese} isInputValid={isChineseInputValid} />
                    <Input placeholder='English' handleChange={handleChange} name='english' value={input.english} isInputValid={isEnglishInputValid} />
               </div>
               <StyledButton>Save</StyledButton>
               <p>{message}</p>
           </form>
       </div>
    )
};

export default AddZhEn;
