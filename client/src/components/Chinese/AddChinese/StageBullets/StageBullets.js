import React from 'react';
import StageBulletsCSS from "./StageBullets.module.css";

export const StageBullets = props => {

    const {savedCharacters, editingCharacter} = props;    

    return (
        <div className={StageBulletsCSS.container}>
            {savedCharacters.map((character, index)=>(<span className={index === editingCharacter ? StageBulletsCSS.editingBullet : StageBulletsCSS.bullet} key={index}>・</span>))}
       </div>
    )
};

export default StageBullets;
