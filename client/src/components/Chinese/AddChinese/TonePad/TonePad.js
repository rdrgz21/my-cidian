import React, {useEffect, useState} from 'react';
import TonePadCSS from "./TonePad.module.css";

export const TonePad = props => {

    const {handleToneClick, savedTone} = props;

    const tones = [1,2,3,4];

    const [clickedTone, setClickedTone] = useState(0);

    useEffect(() => {
    }, [savedTone]);

    const handleClick = event => {
        
        setTimeout(()=> {
            parseInt(event.target.value) === clickedTone ? setClickedTone(0) : setClickedTone(parseInt(event.target.value));
        }, 500);
        
        // console.log(savedTone === clickedTone);
        handleToneClick(event);
    }

    return (
        <div className={TonePadCSS.container}>
            {tones.map((tone, index) => <button className={clickedTone === tone ? TonePadCSS.savedToneButton : undefined} onClick={handleClick} value={tone} key={index}><span>{tone}</span></button>)}
        </div>
    )
};

export default TonePad;
