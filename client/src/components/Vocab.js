import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Tango from './Tango';
import Cihui from './Cihui';
import VocabCSS from "./Vocab.module.css";

export const Vocab = ({lang}) => {
    const [databaseVocab, setDatabaseVocab] = useState([]);

    const isLangJapanese = lang === 'ja';
    const isLangChinese = lang === 'zh';

    const japaneseVocabEndpoint = '/api/vocab/ja';
    const chineseVocabEndpoint = '/api/vocab/zh';

    const vocabEndpoint = () => {
        if (isLangJapanese) return japaneseVocabEndpoint;
        if (isLangChinese) return chineseVocabEndpoint;
    }

    const getVocab = async () => {
        // TODO: create a loading spinner and error message 
        console.log('Getting vocab from DB');
        const res = await axios.get(vocabEndpoint());
        console.log(res.data.foundWords);
        setDatabaseVocab(res.data.foundWords);
    };

    useEffect(()=>{
        getVocab();
    }, [lang]);

    const createTangoItem = (tango) => {
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

    const createCihuiItem = (cihui) => {
        return(
            <Cihui
                key={cihui._id}
                id={cihui._id}
                zh={cihui.chinese}
                english={cihui.english}
                readings={cihui.readings}
                tones={cihui.tones}
            />
        )
    };

    const allVocab = () => {
        if (databaseVocab.length > 0) {
            if(isLangJapanese) return databaseVocab.map(vocab => createTangoItem(vocab));
            if (isLangChinese) return databaseVocab.map(vocab => createCihuiItem(vocab));
        } else return null;
    }

    return (
        <div className={isLangJapanese ? VocabCSS.containerJa : VocabCSS.containerZh}>
            {allVocab()}
        </div>
    )
};

export default Vocab;
