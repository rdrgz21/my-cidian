import React, {useState, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Outlet } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
// import Register from "./components/Pages/Register/Register";
// import Login from "./components/Pages/Login/Login";
// import Vocab from "./components/Pages/Vocab";
// import Home from './components/Pages/Home/Home';

// import AddChinese from "./components/Chinese/AddChinese/AddChinese";


function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const checkLogin = useCallback(async () => {
    try {
      console.log('is logged in?')
      const res = await axios.get('/api/logged_in');
      console.log(res.data, 'res')
      setUser(res.data.username);
    } catch (error) {
      console.error(error)
    }
  }, [navigate]);

  useEffect(() => {
    console.log('useeffect');
    checkLogin();
  }, [checkLogin]);

  return (
      <div style={{border: '2px solid blue', height: '100vh'}}>
        <Navbar  />
      {/* <Navbar user={user} setUser={setUser}  />

        <div className="appContainer">

          <Routes>
            <Route path="/" element={user ? <Vocab user={user} /> : <Home />} />

            {!user && <Route path="register" element={<Register />} />}
            {!user && <Route path="login" element={<Login setUser={setUser} />} />}

            {user && <Route path="addvocab" element={<AddChinese user={user} />} />}

            {user && <Route path="editvocab" element={<AddChinese user={user} />} />}
          </Routes>

        </div> */}
          
        <Outlet context={[user, setUser]} />
      </div>
  );
}

export default App;
