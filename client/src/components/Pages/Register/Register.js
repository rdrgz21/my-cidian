import React, {useState} from 'react';
import RegisterCSS from "./Register.module.css";
import axios from 'axios';
import Input from '../../General/Input/Input';
import StyledButton from '../../General/StyledButton/StyledButton';

const Register = () => {

    const emptyInput = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const [input, setInput] = useState(emptyInput);

    const [message, setMessage] = useState('');

    const handleChange = (event) => {
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
            console.log(res.data);
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
            setMessage('Passwords to not match');
        }
        registerUser();
    };

    return (
        <div>
            Register

            <p>{message}</p>

            <div className={RegisterCSS.container}>

                <form className={RegisterCSS.form} onSubmit={handleSubmit}>
                    <div className={RegisterCSS.inputContainer}>
                            <Input placeholder='Username' handleChange={handleChange} name='username' value={input.username} />
                            <Input placeholder='Email Address' handleChange={handleChange} name='email' value={input.email} />
                            <Input placeholder='Password' handleChange={handleChange} name='password' value={input.password} />
                            <Input placeholder='Confirm Pw' handleChange={handleChange} name='confirmPassword' value={input.confirmPassword} />
                    </div>
                    <StyledButton>Register</StyledButton>
                </form>

            </div>
        </div>
    )
};

export default Register;