import React from 'react';
import ReactDOM from 'react-dom';
import useAuth from '../../../hooks/useAuth';
import StyledButton from '../../General/StyledButton/StyledButton';
import LogoutModalCSS from './LogoutModal.module.css';

const LogoutModal = ({setIsLogoutModalOpen}) => {
    const {onLogout} = useAuth();

    const logoutAndClose = () => {
        onLogout();
        setIsLogoutModalOpen(false);
    }
    
  return ReactDOM.createPortal(
      <div className={LogoutModalCSS.overlay}>
           <div className={LogoutModalCSS.container}>
                <p>Confirm logout</p>
                <div className={LogoutModalCSS.buttonContainer}>
                    <StyledButton onClick={() => logoutAndClose()}>Logout</StyledButton>
                    <StyledButton onClick={() => setIsLogoutModalOpen(false)}>Cancel</StyledButton>
                </div> 
            </div>
      </div>,
      document.getElementById('portal')
    )
};

export default LogoutModal;
