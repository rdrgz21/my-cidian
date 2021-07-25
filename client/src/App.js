import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Vocab from "./components/Vocab";
import SentencesPage from "./components/SentencesPage";
import "./App.css";
import { AddVocab } from "./components/AddVocab";
import AddSentence from "./components/AddSentence";
import AddChinese from "./components/Chinese/AddChinese/AddChinese";

function App() {
  return (
      <Router>
        <Navbar />
        <div className="appContainer">
          <Switch>
            <Route exact path="/" component={Vocab} />
            <Route exact path="/addvocab" component={AddVocab} />
            <Route exact path="/sentences" component={SentencesPage} />
            <Route exact path="/addsentence" component={AddSentence} />
            <Route exact path="/addchinese" component={AddChinese} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
