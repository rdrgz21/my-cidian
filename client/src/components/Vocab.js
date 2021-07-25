import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Tango from './Tango';
// import tangoList from "../tangoList";
import VocabCSS from "./Vocab.module.css";

export const Vocab = () => {
    const [databaseVocab, setDatabaseVocab] = useState([]);

    const getVocab = async () => {
        const res = await axios.get('/api/vocab');
        console.log(res.data.foundWords);
        setDatabaseVocab(res.data.foundWords);
    };

    useEffect(()=>{
        console.log('useEffect');
        getVocab();
    }, []);

    const createTangoItem = (tango) => {
        console.log('creating vocab items');
        return(
            <Tango 
                key={tango._id}
                id={tango._id}
                jp={tango.japanese} 
                reading={tango.reading}
                en={tango.english}
                getVocab={getVocab}
            />
        )    
    };

    const allVocab = databaseVocab.length > 0 && databaseVocab.map(createTangoItem);

    return (
        <div className={VocabCSS.container}>
            {allVocab}
        </div>
    )
};

export default Vocab;
