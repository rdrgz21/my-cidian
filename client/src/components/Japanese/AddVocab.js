import React, {useState} from 'react';
import axios from 'axios';
import VocabCSS from "../Pages/Vocab.module.css";

const AddVocab = () => {

    const [input, setInput] = useState({
        japanese: '',
        reading: '',
        english: ''
    });

    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newVocab = {
            japanese: input.japanese,
            reading: input.reading,
            english: input.english
        };

        console.log(newVocab);
        
        const response = await axios.post('/api/vocab/ja', newVocab, {
            header: {
                'Content-Type': 'application/json'
            }
        });
        setInput({
            japanese: '',
            reading: '',
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
        <div className={VocabCSS.container}>
           <form onSubmit={handleSubmit}>
               <label htmlFor='japanese'>Japanese</label>
               <br />
               <input onChange={handleChange} type='text' name='japanese' value={input.japanese} required />
               <br />
               <label htmlFor='japanese'>Reading</label>
               <br />
               <input onChange={handleChange} type='text' name='reading' value={input.reading} />
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

export default AddVocab;
