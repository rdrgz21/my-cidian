import React, { useContext } from 'react';
import { AddChineseContext, CHINESE_ACTIONS } from '../AddChinese';
import StageBarCSS from "./StageBar.module.css";

export const StageBar = props => {

    const {state, dispatch} = useContext(AddChineseContext);

    const {stage} = state;

    console.log(stage, 'STAGE');

    const handleClick = e => {
        dispatch({type: CHINESE_ACTIONS.SET_STAGE, payload: parseInt(e.target.value)});
    }

    return (
        <div className={StageBarCSS.container}>
            <div>
                <button className={stage === 1 ? StageBarCSS.activeButton : StageBarCSS.button} onClick={handleClick} value={1}></button>
                <span>中英</span>
            </div>
            <div>
                <button className={stage === 2 ? StageBarCSS.activeButton : StageBarCSS.button} onClick={handleClick} value={2}></button>
                <span>拼音</span>
            </div>
            <div>
                <button className={stage === 3 ? StageBarCSS.activeButton : StageBarCSS.button} onClick={handleClick} value={3}></button>
                <span>聲調</span>
            </div>
            <div>
                <button className={stage === 4 ? StageBarCSS.activeButton : StageBarCSS.button} onClick={handleClick} value={4}></button>
                <span>複習</span>
            </div>
       </div>
    )
};

export default StageBar;
