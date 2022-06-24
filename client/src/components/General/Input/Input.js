import React from 'react';
import InputCSS from './Input.module.css';

const Input = ({placeholder, handleChange, name, value, isInputValid}) => {

    // Problems
    // 1. Adjusts font size for all input components visible on page
    //    Need way of distinguishing each one with selectors
    // 2. Only need font size to adjust when width of string is longer than input element

    // const adjustFontSize = () => {
    //     const scrollWidth = document.getElementById('inputField').scrollWidth;
    //     if (scrollWidth > 345) {
    //         let fontSize = parseInt(document.getElementById('inputField').style.fontSize);
    //         console.log(fontSize);
    //         // fontSize--;
    //         // document.getElementById('inputField').style.fontSize = fontSize+'vw';
    //     }
    // }

    // useEffect(() => {
    //     adjustFontSize();
    // }, [value])

    return (
        <label className={InputCSS.customField}>
            <input 
                className={`${InputCSS.input} ${isInputValid === false && value.length > 0 && InputCSS.inputInvalid}`}
                id='inputField' 
                type='text' 
                onChange={handleChange} 
                name={name} 
                value={value}
                autoComplete='off' 
                required
                />
            <span className={InputCSS.placeholder}>
                <p>
                    {placeholder}
                </p>
            </span>
        </label>
    )
}

export default Input;