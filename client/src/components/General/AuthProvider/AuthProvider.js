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
            console.log('is logged in?')
            const res = await axios.get('/api/logged_in');
            console.log(res.data, 'res')
            setUser(res.data.username);
        } catch (error) {
            console.error(error);
            console.log('Failed to log in');
        }
    };

    const handleLogin = async (userDetails) => {
        try {
            const res = await axios.post('/api/login', userDetails, {
                header: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);
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
            console.log('logging out');
            const res = await axios.get('/api/logout');
            setUser(null);
            console.log(res.data);
            return navigate('/');
        } catch (error) {
            console.error(error);
            console.log('Failed to log out');
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