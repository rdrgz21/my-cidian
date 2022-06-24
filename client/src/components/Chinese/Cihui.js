import React, {useState} from 'react';
import CihuiCSS from './Cihui.module.css';
import ReviewWord from './AddChinese/Review/ReviewWord';

const Cihui = props => {

    const [isClicked, setIsClicked] = useState(false);

    const {zh} = props;

    console.log(props);

    return (
        <div onClick={() => setIsClicked(prev => !prev)} className={CihuiCSS.container}>
            <p>{zh}</p>
            {isClicked && <div className={CihuiCSS.reviewWordContainer}><ReviewWord wordData={props} animationPlayed={false} /></div>}
        </div>
    )
}

export default Cihui;
