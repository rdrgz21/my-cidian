import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Vocab from "./components/Vocab";
import SentencesPage from "./components/SentencesPage";
import "./App.css";
import { AddVocab } from "./components/AddVocab";
import AddSentence from "./components/AddSentence";
import AddChinese from "./components/Chinese/AddChinese/AddChinese";

function App() {
  const [studyLang, setStudyLang] = useState('zh');

  const isStudyingJapanese = studyLang === 'ja';
  // const isStudyChinese = studyLang === 'zh';

  return (
      <Router>
        <Navbar studyLang={studyLang} setStudyLang={setStudyLang} />
        <div className="appContainer">
          <Switch>
            <Route exact path="/" render={() => <Vocab lang={studyLang} />} />
            <Route exact path="/addvocab" component={isStudyingJapanese ? AddVocab : AddChinese} />
            <Route exact path="/sentences" component={SentencesPage} />
            <Route exact path="/addsentence" component={AddSentence} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
