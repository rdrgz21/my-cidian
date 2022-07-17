import React from 'react';
import HomeCSS from './Home.module.css';
import { showIndivCharReview } from "../../Chinese/AddChinese/Review/ReviewWord";

const nihao = {
  characters: ["你", "好"],
  pinyin: ["ní", "hǎo"],
  tones: [2,3]
};
const cidian = {
  characters: ["词", "典"],
  pinyin: ["cí", "diǎn"],
  tones: [2,3]
};
const pinyin = {
    characters: ["拼", "音"],
    pinyin: ["pīn", "yīn"],
    tones: [1,1]
  };

const Home = () => {
  return (
    <div className={HomeCSS.container}>
      <span className={HomeCSS.textBlock}>
        <span className={HomeCSS.hanzi}>
            {showIndivCharReview(nihao.characters, nihao.pinyin, nihao.tones, false)}
        </span>
        <span className={HomeCSS.text}>(hello) and welcome to&nbsp;</span>
        <span className={HomeCSS.hanzi}>
            <span className={HomeCSS.text}>my</span>{showIndivCharReview(cidian.characters, cidian.pinyin, cidian.tones, false)}
        </span> 
        <span className={HomeCSS.text}>(dictionary),</span><span className={HomeCSS.text}>a personalised Chinese dictionary&nbsp;</span>
        <span className={HomeCSS.text}>where you can save&nbsp;</span><span className={HomeCSS.text}>newly learnt Chinese words&nbsp;</span>
        <span className={HomeCSS.text}>along with their&nbsp;</span>
        <span className={HomeCSS.hanzi}>
            {showIndivCharReview(pinyin.characters, pinyin.pinyin, pinyin.tones, false)}
        </span> 
        <span className={HomeCSS.text}>(pinyin).</span></span>
    </div>);
}

export default Home;