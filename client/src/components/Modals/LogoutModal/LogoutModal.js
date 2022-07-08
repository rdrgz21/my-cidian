import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useOutletContext } from 'react-router-dom';
import StyledButton from '../../General/StyledButton/StyledButton';
import LogoutModalCSS from './LogoutModal.module.css';

const LogoutModal = ({setIsLogoutModalOpen}) => {
    // const navigate = useNavigate();
    // const [setUser] = useOutletContext();
    const logoutUser = async () => {
        try {
            console.log('logging out');
            const res = await axios.get('/api/logout');
            // setUser(null);
            console.log(res.data);
            // return navigate('/');
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
