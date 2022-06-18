import React, { useContext } from 'react';
import { AddChineseContext, CHINESE_ACTIONS } from '../AddChinese';
import StageBarCSS from "./StageBar.module.css";

export const StageBar = props => {

    const {state, dispatch} = useContext(AddChineseContext);

    const {stage, readings, pinyin, characters} = state;

    const handleClick = e => {
        dispatch({type: CHINESE_ACTIONS.SET_STAGE, payload: parseInt(e.target.value)});
    }

    const readingsAvailable = readings.length > 0;
    const tonesAvailable = pinyin.length > 0;
    const reviewAvailable = characters.length > 0 && readingsAvailable && tonesAvailable;

    return (
        <div className={StageBarCSS.container}>
            <div>
                <button 
                    className={stage === 1 ? StageBarCSS.activeButton : StageBarCSS.button} 
                    onClick={handleClick} 
                    value={1}></button>
                <span>中英</span>
            </div>
            <div>
                <button 
                    className={stage === 2 ? StageBarCSS.activeButton : StageBarCSS.button} 
                    style={!readingsAvailable ? {backgroundColor: 'grey'} : {}} 
                    onClick={handleClick} 
                    disabled={!readingsAvailable}
                    value={2}></button>
                <span>拼音</span>
            </div>
            <div>
                <button 
                    className={stage === 3 ? StageBarCSS.activeButton : StageBarCSS.button} 
                    style={!tonesAvailable ? {backgroundColor: 'grey'} : {}} 
                    onClick={handleClick} 
                    disabled={!tonesAvailable}
                    value={3}></button>
                <span>声调</span>
            </div>
            <div>
                <button 
                    className={stage === 4 ? StageBarCSS.activeButton : StageBarCSS.button} 
                    style={!reviewAvailable ? {backgroundColor: 'grey'} : {}} 
                    onClick={handleClick} 
                    disabled={!reviewAvailable}
                    value={4}></button>
                <span>复习</span>
            </div>
       </div>
    )
};

export default StageBar;
