import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core'
import Warning from './Warning';
import '../App.css';
import { pink, green } from '@material-ui/core/colors';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ValidPosts from './ValidPosts';
import SaveIcon from '@material-ui/icons/Save';
import Loader from './CircularLoader';

const AddPosts = () => {

    const username = useSelector(state => state.authState.username);
    const token = useSelector(state => state.authState.token);
    const [reponseAfterSend, setResponseAfterSend] = useState(null);
    const [initResponse, setInitResponse] = useState(null);
    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);


    useEffect(() => {
        const headers = {
            'Content-type': 'application/x-www-form-urlencoded',
            'auth-token': token
        }

        axios.post('https://blogman-server.herokuapp.com/posts', { token: token })
            .then(res => {
                

                if (res.data.message === 'jwt malformed' || res.data.message == "Auth-token doesn't exist!") {
                    
                    setInitResponse(res.data.name);
                }
                else {
                    setInitResponse('Success');
                }

            })
            .catch(e => {
                
            })
    }, []);


    const handleChange = (e) => {
        const text = e.target.value;
        
        setMessage(text);
    }

    const handleSubmit = () => {
        setLoader(true);
        const data = {
            postContent: message,
            username: username
        }
        axios.post('https://calm-plateau-40983.herokuapp.com/addpost', { data: data })
            .then(res => {
                setTimeout(() => {
                    setLoader(false);
                    setResponseAfterSend(res.data.message.toUpperCase());
                }, 1500)
                
            })
            .catch(e => {
                
            })
    }

    const RenderElement = () => {
        return <Warning msg='Please Login First!' />

    }

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: pink[500]
            },
            secondary: {
                main: green[500]
            }
        }
    })

    return (
        <ThemeProvider theme={theme}>
            {initResponse === 'Success' ?
                <div className="post-content-wrapper">
                    <Container maxWidth={'lg'}>
                        <Grid container alignItems="center" >
                            <Grid item xs={12} sm={12}>
                                <p className='post-heading'>Welcome {username}!</p>
                                <br />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <p className="post-secondary">This is your chance to get creative! Feel free to add posts. Remember, keep the content suitable for all ages!</p>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <p className="post-secondary post-secondary-link">
                                    <Link to='post_requirements' style={{ textDecoration: 'none', color: 'rgb(121, 118, 112)' }}>
                                        Click here to read more about valid posts</Link></p><br />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <textarea className="post-input" placeholder="Example text here" onChange={handleChange}></textarea><br /><br />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    style={{ margin: '0 auto', display: 'block' }}
                                    onClick={handleSubmit}>
                                    Submit Post
                        </Button><br/></Grid>
                        {loader &&
                         <Grid item xs={12} sm={12} lg={12}>
                             <Loader />
                            </Grid> }
                            <Grid item xs={12} sm={12}>
                                <h4 className="post-secondary">{reponseAfterSend}</h4>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
                :
                RenderElement()
            }
        </ThemeProvider>
    );
}
export default AddPosts;