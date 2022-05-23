import React, {useState, useContext} from 'react';
import AddZhEnCSS from "./AddZhEn.module.css";
import Input from '../../../General/Input/Input';
import { AddChineseContext, CHINESE_ACTIONS } from '../AddChinese';
import StyledButton from '../../../General/StyledButton/StyledButton';

export const AddZhEn = () => {

    const {state, dispatch} = useContext(AddChineseContext);

    const {chinese, english, isEditing} = state;

    const [input, setInput] = useState({
        chinese: chinese,
        english: english
    });

    const handleChange =  event => {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        }) 
    };

    const createBaseArrays = (string) => {
        const splitCharacters = string.split('');
        const emptyStringArray = new Array(splitCharacters.length).fill('');
        const emptyNumberArray = new Array(splitCharacters.length).fill(0);
        dispatch({type: CHINESE_ACTIONS.SET_CHARACTERS, payload: splitCharacters});
        dispatch({type: CHINESE_ACTIONS.SET_READINGS, payload: emptyStringArray});
        dispatch({type: CHINESE_ACTIONS.SET_PINYIN, payload: emptyStringArray});
        dispatch({type: CHINESE_ACTIONS.SET_TONES, payload: emptyNumberArray});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isEditing) {
            createBaseArrays(input.chinese);
        }
        dispatch({type: CHINESE_ACTIONS.SET_CHINESE, payload: input.chinese});
        dispatch({type: CHINESE_ACTIONS.SET_ENGLISH, payload: input.english});
        dispatch({type: CHINESE_ACTIONS.NEXT_STAGE});
        // TODO: Validate all characters/English
        
    };

    return (
        <div className={AddZhEnCSS.container}>
            <form className={AddZhEnCSS.form} onSubmit={handleSubmit}>
               <div className={AddZhEnCSS.inputContainer}>
                    <Input placeholder='中文' handleChange={handleChange} name='chinese' value={input.chinese} />
                    <Input placeholder='English' handleChange={handleChange} name='english' value={input.english} />
               </div>
               <StyledButton>Save</StyledButton>
           </form>
       </div>
    )
};

export default AddZhEn;
