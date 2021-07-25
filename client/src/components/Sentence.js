import React, {useState} from "react";
import axios from 'axios';
import SentenceCSS from "./Sentence.module.css";
import Corrections from "./Corrections";

export default function Sentence({id, jp, en, getSentences}) {

    const [isEditing, setIsEditing] = useState(false);
    const [isCorrecting, setisCorrecting] = useState('');

    const [input, setInput] = useState({
        japanese: jp,
        english: en
    });

    const deleteSentence = async () => {
        console.log(id);
        const res = await axios.delete(`/api/deletesentence/${id}`);
        console.log(res.data);
        getSentences();
    };

    const handleSubmit = async () => {

        const updatedSentence = {
            japanese: input.japanese,
            english: input.english
        };

        console.log(updatedSentence);
        
        const response = await axios.post(`/api/updatesentence/${id}`, updatedSentence, {
            header: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response);
    };

    const onClickHandler = () => {
        if (isEditing) {
            handleSubmit()
            .then(setIsEditing(false))
            getSentences();
        } else if (!isEditing) {
            setIsEditing(true)
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setInput({
            ...input,
            [name]: value
        })
    }

    const onClickCorrect = () => {
        if (!isCorrecting) {
            setisCorrecting(true);
        } else if (isCorrecting) {
            setisCorrecting(false);
        }
    }

    return (
        <div className={SentenceCSS.container}>
            <div className={SentenceCSS.sentenceButtonsContainer}>
                {!isEditing && 
                    <div className={SentenceCSS.sentenceContainer}>
                        <h3>{jp}</h3>
                        <hr />
                        <p>{en}</p>
                    </div>
                }
                {isEditing &&
                    <form className={SentenceCSS.formContainer}>
                        <input onChange={handleChange} type='text' name='japanese' value={input.japanese} />
                        <input onChange={handleChange} type='text' name='english' value={input.english} />
                    </form>
                }
                <div className={SentenceCSS.buttonContainer}>
                    {!isEditing && <button className={SentenceCSS.halfWidthButton} onClick={onClickHandler}>Edit</button>}
                    {isEditing && 
                        <div className={SentenceCSS.cancelSaveButtonContainer}>
                            <button className={SentenceCSS.eighthWidthButton} onClick={()=>setIsEditing(false)}>Cancel</button>
                            <button className={SentenceCSS.eighthWidthButton} onClick={onClickHandler}>Save</button>
                        </div>
                    }
                    <button className={SentenceCSS.halfWidthButton} onClick={deleteSentence}>Delete</button>
                    <button className={SentenceCSS.halfWidthButton}>Comment</button>
                    <button className={SentenceCSS.halfWidthButton} onClick={onClickCorrect}>Corrections</button>
                </div>
            </div>
            
            {/* Sentence corrections component */}
            {isCorrecting && 
                <Corrections sentenceID={id} sentence={input.japanese} />
            }
        </div>
    )
}
