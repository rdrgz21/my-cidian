import React, {useState} from 'react';
import axios from 'axios';
import SentencesPageCSS from "./SentencesPage.module.css";

export const AddSentence = () => {

    const [input, setInput] = useState({
        japanese: '',
        english: ''
    });

    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newSentence = {
            japanese: input.japanese,
            english: input.english
        };

        console.log(newSentence);
        
        const response = await axios.post('/api/sentences', newSentence, {
            header: {
                'Content-Type': 'application/json'
            }
        });
        setInput({
            japanese: '',
            english: ''
        })
        setMessage(response.data.message);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    };

    return (
        <div className={SentencesPageCSS.container}>
           <form onSubmit={handleSubmit}>
               <h1>Add Sentence</h1>
               <label htmlFor='japanese'>Japanese</label>
               <br />
               <input onChange={handleChange} type='text' name='japanese' value={input.japanese} required />
               <br />
               <label htmlFor='japanese'>English</label>
               <br />
               <input onChange={handleChange} type='text' name='english' value={input.english} required />
               <br />
               <button>Click me</button>
               <br />
               {message}
           </form>
        </div>
    )
};

export default AddSentence;
