import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Sentence from './Sentence';
import SentencesPageCSS from "./SentencesPage.module.css";

export const SentencesPage = () => {
    const [databaseSentences, setDatabaseSentences] = useState([]);

    const getSentences = async () => {
        console.log('Getting sentences');
        const res = await axios.get('/api/sentences');
        setDatabaseSentences(res.data.foundSentences);
    };

    useEffect(()=>{
        getSentences();
    }, []);

    const createSentenceItem = (sentence) => {
        console.log('creating sentence item');
        return(
            <Sentence 
                key={sentence._id}
                id={sentence._id}
                jp={sentence.japanese} 
                en={sentence.english}
                getSentences={getSentences}
            />
        )    
    };

    const allSentences = databaseSentences.length > 0 && databaseSentences.map(createSentenceItem);

    return (
        <div className={SentencesPageCSS.container}>
            {allSentences}
        </div>
    )
};

export default SentencesPage;
