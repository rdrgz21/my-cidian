import React, { useContext } from 'react';
import { AddChineseContext } from '../AddChinese';
import StageBulletsCSS from "./StageBullets.module.css";

export const StageBullets = props => {

    const {editingCharacter} = props;

    const {state} = useContext(AddChineseContext);

    const {characters} = state

    return (
        <div className={StageBulletsCSS.container}>
            {characters.map((character, index)=>(<span className={index === editingCharacter ? StageBulletsCSS.editingBullet : StageBulletsCSS.bullet} key={index}>・</span>))}
       </div>
    )
};

export default StageBullets;
