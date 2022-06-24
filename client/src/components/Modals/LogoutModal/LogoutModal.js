import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import LogoutModalCSS from './LogoutModal.module.css';

const LogoutModal = ({setUser, setIsLogoutModalOpen}) => {
    const history = useHistory();
    const logoutUser = async () => {
        try {
            const res = await axios.get('/api/logout');
            setUser(null);
            console.log(res.data);
            history.push('/');
        } catch (error) {
            console.error(error);
        }
    }
    
  return ReactDOM.createPortal(
      <div className={LogoutModalCSS.overlay}>
           <div className={LogoutModalCSS.container}>
                <p>Confirm logout</p>
                <div className={LogoutModalCSS.buttonContainer}>
                    <button onClick={() => logoutUser()}>Logout</button>
                    <button onClick={() => setIsLogoutModalOpen(false)}>Cancel</button>
                </div> 
            </div>
      </div>,
      document.getElementById('portal')
    )
};

export default LogoutModal;
