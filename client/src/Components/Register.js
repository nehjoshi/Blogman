import React, { useState } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { yellow, indigo } from '@material-ui/core/colors';
import axios from 'axios';
import regAction from '../redux/actions/regAction';
import store from '../store';
import RegOTP from './RegOTP';
import { Route, Link, useHistory } from 'react-router-dom';

const Register = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }
    }
    const handleClick = () => {
        const post = { email: email, username: username, password: password };
        console.log(post);
        axios.post('http://localhost:5000/getnumber', post)
            .then(res => {
                const { message } = res.data;
                if (message == '"email" must be a valid email' || message == '"email" is not allowed to be empty') {
                    setResponse('Please enter a valid email address');
                }
                else if (message == '"username" is not allowed to be empty' || message == '"username" length must be at least 6 characters long') {
                    setResponse('Please enter a username of at least six characters');
                }
                else if (message == '"password" is not allowed to be empty' || message == '"password" length must be at least 6 characters long') {
                    setResponse('Please enter a password of at least six characters');
                }
                else {
                    setResponse(message);
                    console.log('Response state: ', message);
                    store.dispatch(regAction(email, username, password, res.data.otp));
                    history.push('/verifytoken');
                }
            })
            .catch(e => {
            })
    }

    const theme = createMuiTheme({

        palette: {
            primary: yellow,
            secondary: indigo,
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Route exact path='/verifytoken' component={RegOTP} />
            <div className="content-wrapper register-wrapper"><br /><br /><br /><br />
                <p className="info-label">Sign up with your email account</p><br /><br />
                <TextField
                    label="Email"
                    placeholder="example@example.com"
                    onChange={handleChange}
                    size="medium"
                    name="email"
                    className="input"
                    color="primary"
                    variant="outlined"
                />
                <br></br>
                <TextField
                    label="Username"
                    placeholder="JohnSmith123"
                    onChange={handleChange}
                    size="medium"
                    name="username"
                    color="primary"
                    variant="outlined"
                />
                <br></br>
                <TextField
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    size="medium"
                    type="password"
                    color="primary"
                    variant="outlined"
                />
                <br></br><br></br>
                <p class="invalid" style={{ fontSize: '0.8rem' }}>By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy.<br /> You may receive email notifications from us and can opt out at any time.</p><br />
                <button
                    className="submit-button submit-register"
                    onClick={handleClick}
                    style={{ display: "block", margin: '0 auto' }}>
                    Sign Up
                    </button><br /><br /><br />
                {response === 'Email sent' ? <>
                    <button
                        className="submit-button submit-register"
                        style={{ display: "block", margin: '0 auto' }}>
                        <Link to='/verifytoken' style={{ textDecoration: 'none', color: 'white' }}>Get OTP</Link>
                    </button><br /><br /> </> : <p style={{ color: 'rgb(42, 42, 68)' }}>{response}</p>}
            </div>
        </ThemeProvider>
    );
}
export default Register;