import React, {useEffect, useState, useCallback} from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Pages/Register/Register";
import Login from "./components/Pages/Login/Login";
import Vocab from "./components/Pages/Vocab";
import Home from './components/Pages/Home/Home';

import AddChinese from "./components/Chinese/AddChinese/AddChinese";


function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  const checkLogin = useCallback(async () => {
    try {
      const res = await axios.get('/api/logged_in');
      setUser(res.data.username);
      history.push('/');
    } catch (error) {
      console.error(error)
    }
  }, [history]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
      <Router>
        <Navbar user={user} setUser={setUser}  />

        <div className="appContainer">

          <Switch>
            <Route exact path="/" render={() => user ? <Vocab user={user} /> : <Home />} />

            {!user && <Route exact path="/register" component={Register} />}
            {!user && <Route exact path="/login" render={() => <Login setUser={setUser} />} />}

            {user && <Route exact path="/addvocab" render={() => <AddChinese user={user} />} />}

            {user && <Route exact path="/editvocab" render={() => <AddChinese user={user} />} />}
          </Switch>

        </div>
      </Router>
  );
}

export default App;
