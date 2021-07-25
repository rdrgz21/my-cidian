import React, {useState} from 'react';
import AddChineseCSS from "./AddChinese.module.css";
import AddZhEn from './AddZhEn/AddZhEn';
import AddReadings from './AddReadings/AddReadings';
import AddTones from './AddTones/AddTones';
import Review from './Review/Review';

export const AddChinese = () => {

    const [chinese, setChinese] = useState('');
    const [meaning, setMeaning] = useState('');
    const [characters, setCharacters] = useState([]);
    const [readings, setReadings] = useState([]);
    const [tones, setTones] = useState([]);
    const [pinyin, setPinyin] = useState([]);
    const [stage, setStage] = useState(1);

    const nextStage = () => {
        console.log('NEXT');
        setStage(stage + 1);
    };
    const previousStage = () => setStage(stage - 1);

    const createBaseArrays = (string) => {
        const splitCharacters = string.split('');
        const emptyStringArray = new Array(splitCharacters.length).fill('');
        const emptyNumberArray = new Array(splitCharacters.length).fill(0);
        setCharacters(splitCharacters);
        setReadings(emptyStringArray);
        setPinyin(emptyStringArray);
        setTones(emptyNumberArray);
    }

    const generateComponentByStage = stage => {
        switch (stage) {
            case 1:
                return <AddZhEn setChinese={setChinese} setMeaning={setMeaning} createBaseArrays={createBaseArrays} nextStage={nextStage} />;
            case 2:
                return <AddReadings savedCharacters={characters} savedReadings={readings} setReadings={setReadings} nextStage={nextStage} />
            case 3:
                return <AddTones savedCharacters={characters} savedReadings={readings} savedTones={tones} setTones={setTones} savedPinyin={pinyin} setPinyin={setPinyin} nextStage={nextStage} />
            case 4:
                return <Review savedCharacters={characters} savedPinyin={pinyin} savedMeaning={meaning} />
            default:
                return null;
        }
    }

    return (
        <div className={AddChineseCSS.container}>
            Chinese: {chinese}<br />
            Meaning: {meaning}<br />
            Characters: {characters}<br />
            Readings: {readings}<br />
            Tones: {tones}<br />
            Pinyin: {pinyin}<br />
            <button onClick={nextStage}>Next</button>
            <button onClick={previousStage}>Back</button>
            {generateComponentByStage(stage)}
       </div>
    )
};

export default AddChinese;
