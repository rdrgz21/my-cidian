import React, {useState} from 'react';
import LoginCSS from "./Login.module.css";
import axios from 'axios';
import Input from '../../General/Input/Input';
import StyledButton from '../../General/StyledButton/StyledButton';
import { useHistory } from 'react-router-dom';

const Login = ({setUser}) => {

    const emptyInput = {
        username: '',
        password: ''
    };

    const [input, setInput] = useState(emptyInput);

    const [message, setMessage] = useState('');

    const history = useHistory();

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
        }

        try {
            const res = await axios.post('/api/login', userDetails, {
                header: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);
            setMessage(res.data.message);
            setInput(emptyInput);
            if (res.data.username) {
              setUser(res.data.username);
              return history.push('/');
            }
        } catch (error) {
            console.error(error);
        }

    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        loginUser();
    };

    return (
        <div>
            <div className={LoginCSS.container}>
                <form className={LoginCSS.form} onSubmit={handleSubmit}>
                    <div className={LoginCSS.inputContainer}>
                            <Input placeholder='Username' handleChange={handleChange} name='username' value={input.username} />
                            <Input placeholder='Password' handleChange={handleChange} name='password' value={input.password} />
                    </div>
                    <StyledButton>Login</StyledButton>
                </form>
                <p className={LoginCSS.message}>{message}</p>
            </div>
        </div>
    )
};

export default Login;