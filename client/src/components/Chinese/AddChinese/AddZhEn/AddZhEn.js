import React, {useState} from 'react';
import AddZhEnCSS from "./AddZhEn.module.css";
import Input from '../../../General/Input/Input';

export const AddZhEn = (props) => {

    const {setChinese, setMeaning, createBaseArrays, nextStage} = props;

    const [input, setInput] = useState({
        chinese: '',
        meaning: ''
    });

    const handleChange = (event) => {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        }) 
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        createBaseArrays(input.chinese);
        setChinese(input.chinese);
        setMeaning(input.meaning);
        nextStage();
        // Validate all characters/English
        
    };

    return (
        <div className={AddZhEnCSS.container}>
            <form className={AddZhEnCSS.form} onSubmit={handleSubmit}>
               <div className={AddZhEnCSS.inputContainer}>
                    <Input placeholder='中文' handleChange={handleChange} name='chinese' value={input.chinese} />
                    <Input placeholder='English' handleChange={handleChange} name='meaning' value={input.meaning} />
               </div>
               <button className={AddZhEnCSS.button}>Save</button>
           </form>
       </div>
    )
};

export default AddZhEn;
