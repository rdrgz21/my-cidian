import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Cihui from '../../Chinese/Cihui/Cihui';
import VocabCSS from "./Vocab.module.css";
import useAuth from '../../../hooks/useAuth';

export const Vocab = () => {
    const [databaseVocab, setDatabaseVocab] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const {user} = useAuth();

    const getVocab = useCallback(async () => {
        setLoading(true);
        // TODO: create a loading spinner and error message 
        if(user) {
            try {
                const res = await axios.get(`https://my-cidian.herokuapp.com/api/vocab/zh/${user}`);
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
            {isLoading && !databaseVocab.length && <div className={VocabCSS.noVocab}>Loading...</div>}
            {!databaseVocab.length && !isLoading && <div className={VocabCSS.noVocab}>You have no vocabulary saved yet! <Link to='/addvocab'>Try adding a word.</Link></div>}
        </div>
    )
};

export default Vocab;
