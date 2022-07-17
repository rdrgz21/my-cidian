import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import RegisterCSS from "./Register.module.css";
import axios from 'axios';
import Input from '../../General/Input/Input';
import StyledButton from '../../General/StyledButton/StyledButton';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const emptyInput = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [input, setInput] = useState(emptyInput);
    const [message, setMessage] = useState('');
    const {user} = useAuth();

    const handleChange = (event) => {
        setMessage('');
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        }) 
    };

    const registerUser = async () => {
        const userDetails = {
            username: input.username,
            email: input.email,
            password: input.password
        }

        try {
            const res = await axios.post('/api/register', userDetails, {
                header: {
                    'Content-Type': 'application/json'
                }
            });
            setMessage(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setInput(emptyInput);
        }

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (input.password !== input.confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            registerUser();
        }
    };

    return (
        <div>
            <div className={RegisterCSS.container}>
                {user && <Navigate to='/vocab' replace={true} />}
                <form className={RegisterCSS.form} onSubmit={handleSubmit}>
                    <div className={RegisterCSS.inputContainer}>
                            <Input placeholder='Username' handleChange={handleChange} name='username' value={input.username} />
                            <Input placeholder='Email Address' handleChange={handleChange} name='email' value={input.email} />
                            <Input placeholder='Password' handleChange={handleChange} name='password' value={input.password} isPassword={true} />
                            <Input placeholder='Confirm Password' handleChange={handleChange} name='confirmPassword' value={input.confirmPassword} isPassword={true} />
                    </div>
                    <StyledButton>Register</StyledButton>
                </form>
                <p className={RegisterCSS.message}>{message}</p>
            </div>
        </div>
    )
};

export default Register;