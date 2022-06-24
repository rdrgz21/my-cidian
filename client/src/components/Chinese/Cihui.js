import React, {useState} from 'react';
import CihuiCSS from './Cihui.module.css';
import ReviewWord from './AddChinese/Review/ReviewWord';

const Cihui = props => {

    const [isClicked, setIsClicked] = useState(false);
    const [isReviewWordUnmounting, setIsReviewWordUnmounting] = useState(false);

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
    }

    const {zh} = props;

    return (
        <div onClick={() => openCloseReviewWord()} className={CihuiCSS.container}>
            <p className={CihuiCSS.text}>{zh}</p>
            {isClicked && <div className={`${CihuiCSS.reviewWordContainer} ${isReviewWordUnmounting ? CihuiCSS.unmounting : null}`}><ReviewWord wordData={props} animationPlayed={false} /></div>}
        </div>
    )
}

export default Cihui;
