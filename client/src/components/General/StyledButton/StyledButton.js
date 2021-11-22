import React from 'react';
import StyledButtonCSS from './StyledButton.module.css'

const StyledButton= ({children, onClick, type}) => {
    return (
        <button className={StyledButtonCSS.button} onClick={onClick} type={type}>{children}</button>
    )
}

export default StyledButton;
