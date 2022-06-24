import React, {useState} from 'react';
import CihuiCSS from './Cihui.module.css';
import ReviewWord from './AddChinese/Review/ReviewWord';

const Cihui = props => {

    const [isClicked, setIsClicked] = useState(false);
    const [isReviewWordUnmounting, setIsReviewWordUnmounting] = useState(false);

    const {zh, getVocab} = props;

    const openCloseReviewWord = () => {
        if (isClicked) {
            setIsReviewWordUnmounting(true);
            setTimeout(() => {
                setIsClicked(false);
                setIsReviewWordUnmounting(false)
            }, 500);
        } else {
            setIsClicked(true)
        }
        getVocab();
    }

    return (
        <div onClick={(e) => openCloseReviewWord(e)} className={CihuiCSS.container}>
            <p className={CihuiCSS.text}>{zh}</p>
            {isClicked && <div className={`${CihuiCSS.reviewWordContainer} ${isReviewWordUnmounting ? CihuiCSS.unmounting : null}`}><ReviewWord wordData={props} animationPlayed={false} isSavedWord={true} openCloseReviewWord={openCloseReviewWord} /></div>}
        </div>
    )
}

export default Cihui;
