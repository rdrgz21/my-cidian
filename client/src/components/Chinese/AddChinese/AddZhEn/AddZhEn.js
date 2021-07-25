import React, {useState} from 'react';
import AddZhEnCSS from "./AddZhEn.module.css";

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
            <form onSubmit={handleSubmit}>
               <label htmlFor='chinese'>Chinese</label>
               <br />
               <input onChange={handleChange} type='text' name='chinese' value={input.japanese} required />
               <br />
               <label htmlFor='meaning'>Meaning</label>
               <br />
               <input onChange={handleChange} type='text' name='meaning' value={input.reading} />
               <br />
               <button>Click me</button>
               <br />
           </form>
       </div>
    )
};

export default AddZhEn;
