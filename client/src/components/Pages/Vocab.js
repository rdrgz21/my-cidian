import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import Tango from '../Japanese/Tango';
import Cihui from '../Chinese/Cihui';
import VocabCSS from "./Vocab.module.css";

export const Vocab = ({user}) => {
    const [databaseVocab, setDatabaseVocab] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getVocab = async () => {
        setLoading(true);
        // TODO: create a loading spinner and error message 
        if(user) {
            try {
                const res = await axios.get(`/api/vocab/zh/${user}`);
                console.log(res.data.foundWords);
                setDatabaseVocab(res.data.foundWords.reverse());
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
            return;
        }
        return 'User not logged in';
    };

    useEffect(() => {
        getVocab();
    }, []);


    // const createTangoItem = (tango) => {
    //     return(
    //         <Tango 
    //             key={tango._id}
    //             id={tango._id}
    //             jp={tango.japanese} 
    //             reading={tango.reading}
    //             en={tango.english}
    //             getVocab={getVocab}
    //         />
    //     )    
    // };

    const createCihuiItem = (cihui) => {
        return(
            <Cihui
                key={cihui._id}
                id={cihui._id}
                zh={cihui.chinese}
                readings={cihui.readings}
                characters={cihui.characters}
                english={cihui.english}
                pinyin={cihui.pinyin}
                tones={cihui.tones}
                getVocab={getVocab}
            />
        )
    };

    const allVocab = () => {
        if (databaseVocab.length > 0) {
            // if(isLangJapanese) return databaseVocab.map(vocab => createTangoItem(vocab));
            return databaseVocab.map(vocab => createCihuiItem(vocab));
        } else return null;
    }

    return (
        // <div className={isLangJapanese ? VocabCSS.containerJa : VocabCSS.containerZh}>
        <div className={VocabCSS.containerZh}>
            {allVocab()}
            {isLoading && <div>Loading...</div>}
            {!databaseVocab.length && !isLoading && <div>You have no vocabulary saved yet! Try adding a word.</div>}
        </div>
    )
};

export default Vocab;
