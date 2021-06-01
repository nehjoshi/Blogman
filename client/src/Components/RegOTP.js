import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { yellow, indigo } from '@material-ui/core/colors';
import axios from 'axios';
import '../App.css';
import { useHistory } from 'react-router';

const RegOTP = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('Not registered yet');
    const [otp, setOtp] = useState(null);
    const [tryOtp, setTryOtp] = useState(null);
    const getEmail = useSelector(state => state.authState.regEmail);
    const getUsername = useSelector(state => state.authState.regUsername);
    const getPassword = useSelector(state => state.authState.regPassword);
    const getOtp = useSelector(state => state.authState.otp);
    const [success, setSuccess] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setEmail(getEmail);
        setUsername(getUsername);
        setPassword(getPassword);
        setOtp(getOtp);
        console.log('REGOTP loaded');
    }, [])

    const theme = createMuiTheme({

        palette: {
            primary: yellow,
            secondary: indigo,
        }
    });

    const handleChange = (e) => {
        const temp = e.target.value;
        setTryOtp(parseInt(temp));
    }

    const handleClick = (e) => {
        const post = {email: email, username: username, password: password, otp: otp, tryOtp: tryOtp};
        console.log("Post: ", post);

        axios.post('http://localhost:5000/register', post)
        .then(res => {
            console.log(res);
            setResponse(res.data.message);
            if (res.data.message === "User Registration Successful"){
                setSuccess(true);
                history.push('/');
            }
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <div class="content-wrapper"><br /><br /><br /><br /><br /><br /><br /><br /><br />
                
                {!success ? <>
                    <TextField
                    label="One Time Password"
                    placeholder="******"
                    onChange={handleChange}
                    size="medium"
                    name="email"
                    className="input"
                    color="primary"
                />
                <br></br><br></br>
                <button
                    className="submit-button submit-register"
                    onClick={handleClick}
                    style={{ display: "block", margin: '0 auto' }}>
                        Submit
                </button></>
                : null}<br /><br />
                <p style={{color: 'white'}}>{response}</p>
            </div>
        </ThemeProvider>
    )
}
export default RegOTP;