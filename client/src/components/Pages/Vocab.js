import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import Cihui from '../Chinese/Cihui';
import VocabCSS from "./Vocab.module.css";
import useAuth from '../../hooks/useAuth';

export const Vocab = () => {
    const [databaseVocab, setDatabaseVocab] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const {user} = useAuth();

    const getVocab = useCallback(async () => {
        setLoading(true);
        // TODO: create a loading spinner and error message 
        if(user) {
            try {
                const res = await axios.get(`/api/vocab/zh/${user}`);
                console.log(res.data.foundWords);
                setDatabaseVocab(res.data.foundWords.reverse());
            } catch (error) {
                // TODO: Show error to user
                console.error(error);
            }
            setLoading(false);
            return;
        }
    },[user]);

    useEffect(() => {
        getVocab();
    }, [getVocab]);

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
            return databaseVocab.map(vocab => createCihuiItem(vocab));
        } else return null;
    }

    return (
        <div className={VocabCSS.containerZh}>
            {/* Subrendering */}
            {allVocab()}
            {isLoading && !databaseVocab && <div>Loading...</div>}
            {!databaseVocab.length && !isLoading && <div>You have no vocabulary saved yet! Try adding a word.</div>}
        </div>
    )
};

export default Vocab;
