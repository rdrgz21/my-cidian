import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import LoginCSS from "./Login.module.css";
import Input from '../../General/Input/Input';
import StyledButton from '../../General/StyledButton/StyledButton';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const emptyInput = {
        username: '',
        password: ''
    };

    const [input, setInput] = useState(emptyInput);
    const {user, message, setMessage, onLogin} = useAuth();

    useEffect(() => {
        setMessage('');
    }, [setMessage]);

    const handleChange = (event) => {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        }) 
    };

    const loginUser = async () => {
        const userDetails = {
            username: input.username,
            password: input.password
        };
        onLogin(userDetails);
        setInput(emptyInput);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        loginUser();
    };

    return (
        <div>
            <div className={LoginCSS.container}>
                {user && <Navigate to='/vocab' replace={true} />}
                <form className={LoginCSS.form} onSubmit={handleSubmit}>
                    <div className={LoginCSS.inputContainer}>
                            <Input placeholder='Username' handleChange={handleChange} name='username' value={input.username} />
                            <Input placeholder='Password' handleChange={handleChange} name='password' value={input.password} isPassword={true} />
                    </div>
                    <StyledButton>Login</StyledButton>
                </form>
                <p className={LoginCSS.message}>{message}</p>
            </div>
        </div>
    )
};

export default Login;