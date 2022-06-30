import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import StyledButton from '../../General/StyledButton/StyledButton';
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
                    <StyledButton onClick={() => logoutUser()}>Logout</StyledButton>
                    <StyledButton onClick={() => setIsLogoutModalOpen(false)}>Cancel</StyledButton>
                </div> 
            </div>
      </div>,
      document.getElementById('portal')
    )
};

export default LogoutModal;
