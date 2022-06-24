import React, {useState} from 'react';
import CihuiCSS from './Cihui.module.css';

const Cihui = props => {

    const [isClicked, setIsClicked] = useState(false);

    const {id, zh, english, readings, tones} = props;

    return (
        <div onClick={() => setIsClicked(prev => !prev)} className={`${CihuiCSS.container} ${isClicked && CihuiCSS.clicked}`}>
            {zh}<br />
            {/* {english} */}
        </div>
    )
}

export default Cihui;
