import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Pages/Register/Register";
import Login from "./components/Pages/Login/Login";

import Vocab from "./components/Pages/Vocab";
import AddChinese from "./components/Chinese/AddChinese/AddChinese";

// import AddVocab from "./components/Japanese/AddVocab";
// import AddSentence from "./components/Japanese/AddSentence";
// import SentencesPage from "./components/Japanese/SentencesPage";


function App() {
  // const [studyLang, setStudyLang] = useState('zh');
  // const isStudyingJapanese = studyLang === 'ja';
  // const isStudyChinese = studyLang === 'zh';

  const [user, setUser] = useState(null);

  return (
      <Router>

        {/* <Navbar studyLang={studyLang} setStudyLang={setStudyLang} user={user} setUser={setUser}  /> */}
        <Navbar user={user} setUser={setUser}  />

        <div className="appContainer">

          <Switch>
            <Route exact path="/" render={() => user ? <Vocab lang='zh' /> : <div>Home</div>} />

            {!user && <Route exact path="/register" component={Register} />}
            {!user && <Route exact path="/login" render={() => <Login setUser={setUser} />} />}

            {/* <Route exact path="/addvocab" component={isStudyingJapanese ? AddVocab : AddChinese} /> */}
            {user && <Route exact path="/addvocab" component={AddChinese} />}

            {/* <Route exact path="/sentences" component={SentencesPage} />
            <Route exact path="/addsentence" component={AddSentence} /> */}
          </Switch>

        </div>
      </Router>
  );
}

export default App;
