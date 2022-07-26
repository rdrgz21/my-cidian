import React, {useState, createContext, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        checkLogin();
    },[]);

    const checkLogin = async () => {
        try {
            const res = await axios.get('https://my-cidian.herokuapp.com/api/logged_in');
            setUser(res.data.username);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = async (userDetails) => {
        try {
            const res = await axios.post('https://my-cidian.herokuapp.com/api/login', userDetails, {
                header: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            setMessage(res.data.message);
            if (res.data.username) {
              setUser(res.data.username);
              return navigate('/vocab');
            }
        } catch (error) {
            console.error(error);
        }
    }
  
    const handleLogout = async () => {
        setMessage('');
        try {
            await axios.get('https://my-cidian.herokuapp.com/api/logout');
            setUser(null);
            return navigate('/');
        } catch (error) {
            console.error(error);
        }
    };
  
    const value = {
      user,
      setUser,
      message,
      setMessage,
      onLogin: handleLogin,
      onLogout: handleLogout,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };

  export default AuthProvider;