// import axios from 'axios';
import React from 'react';
import CorrectionsCSS from './Corrections.module.css';
const Diff = require('diff');

export default function Corrections({sentenceID, sentence}) {
    // const [databaseCorrections, setDatabaseCorrections] = useState([]);

    // const [input, setInput] = useState('');

    // const getCorrections = async () => {
    //     try {
    //         const response = await axios.get(`/api/corrections/${sentenceID}`);
    //         setDatabaseCorrections(response.data.foundCorrections);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(()=>{
    //     getCorrections();
    // }, []);

    const onChangeHandler = (event) => {
        const {value} = event.target;
        // setInput(value);
    };

    const onClickHandler = async (event) => {
        event.preventDefault();

        // const newCorrection = {
        //     sentenceID: sentenceID,
        //     correction: input
        // };

        // console.log(newCorrection);
        
        // const response = await axios.post('/api/corrections', newCorrection, {
        //     header: {
        //         'Content-Type': 'application/json'
        //     }
        // });
        // setInput('');
        // getCorrections();
    };

    const createCorrection = (correction) => {
        const changes = trackChanges(correction.correction);
        return  <li key={correction._id}>
            {changes.map(constructDeletions)}
            <br />
            {changes.map(constructAdditions)}
            {/* <button>Delete me</button> */}
            <hr />
        </li>
    };

    const constructDeletions = (change) => {
        if (change.removed) {;
            return <span style={{color: "red"}}>{change.value}</span>;
        } else if (!change.added && !change.removed) {
            return <span>{change.value}</span>;
        } else return null;
    };

    const constructAdditions = (change) => {
        if (change.added) {
            return <span style={{color: "blue"}}>{change.value}</span>;
        } else if (!change.added && !change.removed) {
            return <span>{change.value}</span>;
        } else return null;
    };

    const trackChanges = (correction) => {
        const originalSentence = sentence;
        const correctedSentence = correction;
        const changes = Diff.diffChars(originalSentence, correctedSentence);
        return changes;
    };

    // const allCorrections = databaseCorrections.length > 0 && databaseCorrections.map(createCorrection);

    const onKeyDown = (e) => {
        if (e.keyCode === 8) {
            console.log(e);
        }
    }

    return (
        <div className={CorrectionsCSS.container}>
            <ul>
                {/* {allCorrections} */}
            </ul>
            <div className={CorrectionsCSS.inputContainer}>
                {/* <input onChange={onChangeHandler} value={input} onKeyDown={onKeyDown} /> */}
                <button onClick={onClickHandler}>Submit correction</button>
            </div>
        </div>
    )
}
