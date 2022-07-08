import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Pages/Register/Register";
import Login from "./components/Pages/Login/Login";
import Vocab from "./components/Pages/Vocab";
import Home from './components/Pages/Home/Home';

import AddChinese from "./components/Chinese/AddChinese/AddChinese";
import AuthProvider from "./components/General/AuthProvider/AuthProvider";


function App() {
  return (
        <AuthProvider>
          <Navbar  />
          <div className="appContainer">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="addvocab" element={<AddChinese />} />
                <Route path="vocab" element={<Vocab />} />
            </Routes>
          </div>
        </AuthProvider>
  );
}

export default App;
