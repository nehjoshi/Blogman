import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Typography, TextField } from '@material-ui/core'
import Warning from './Warning';
import { pink, green } from '@material-ui/core/colors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from './CircularLoader';

const useStyles = makeStyles((theme) => ({

    wrapper: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        padding: '0px 10px',
        background: 'linear-gradient(to right, #da22ff, #9733ee)',
    },
    formBox: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        [theme.breakpoints.down("md")]: {
            width: '100%'
        },
        [theme.breakpoints.down("sm")]: {
            width: '100%'
        }
    },
    heading: {
        fontFamily: 'Lato',
        [theme.breakpoints.down("sm")]: {
            fontSize: '2rem'
        },
    },
    input: {
        marginTop: '30px',
        width: '600px',
        [theme.breakpoints.down("sm")]: {
            width: '400px'
        },
    },
    text: {
        [theme.breakpoints.down("sm")]: {
            fontSize: '1.7rem'
        },
    },
    rules: {
        color: 'black'
    }

}))

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
        axios.post('https://blogman-server.herokuapp.com/addpost', { data: data })
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

    const classes = useStyles();

    return (
        <>
            {initResponse === 'Success' ?
                // <div className="post-content-wrapper">
                //     <Container maxWidth={'lg'}>
                //         <Grid container alignItems="center" >
                //             <Grid item xs={12} sm={12}>
                //                 <p className='post-heading'>Welcome {username}!</p>
                //                 <br />
                //             </Grid>
                //             <Grid item xs={12} sm={12}>
                //                 <p className="post-secondary">This is your chance to get creative! Feel free to add posts. Remember, keep the content suitable for all ages!</p>
                //             </Grid>
                //             <Grid item xs={12} sm={12}>
                //                 <p className="post-secondary post-secondary-link">
                //                     <Link to='post_requirements' style={{ textDecoration: 'none', color: 'rgb(121, 118, 112)' }}>
                //                         Click here to read more about valid posts</Link></p><br />
                //             </Grid>

                //             <Grid item xs={12} sm={12}>
                //                 <textarea className="post-input" placeholder="Example text here" onChange={handleChange}></textarea><br /><br />
                //             </Grid>
                //             <Grid item xs={12} sm={12}>
                //                 <Button
                //                     variant="contained"
                //                     size="large"
                //                     color="primary"
                //                     style={{ margin: '0 auto', display: 'block' }}
                //                     onClick={handleSubmit}>
                //                     Submit Post
                //         </Button><br/></Grid>
                //         {loader &&
                //          <Grid item xs={12} sm={12} lg={12}>
                //              <Loader />
                //             </Grid> }
                //             <Grid item xs={12} sm={12}>
                //                 <h4 className="post-secondary">{reponseAfterSend}</h4>
                //             </Grid>
                //         </Grid>
                //     </Container>
                // </div>

                <div className={classes.wrapper}>
                    <Grid container className={classes.formBox}>
                        <Grid item>
                            <Typography variant="h2" gutterBottom className={classes.heading}>
                                Welcome {username}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" className={classes.text} gutterBottom>
                                This is your chance to get creative!
                        </Typography>
                        </Grid>
                        <Grid item>
                            <Link to='post_requirements' style={{ textDecoration: 'underline', color: 'black' }}>
                                <Typography variant="h5" gutterBottom className={classes.rules}>But first, read the rules for valid posts.</Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Post"
                                className={classes.input}
                                multiline
                                rows={6}
                                placeholder="Insert Post Here"
                                color="primary"
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                style={{ margin: '20px auto', display: 'block' }}
                                onClick={handleSubmit}>
                                Submit Post
                         </Button></Grid>
                        {loader &&
                            <Grid item xs={12} sm={12} lg={12}>
                                <Loader />
                            </Grid>}
                        <Grid item xs={12} sm={12}>
                            <Typography className={classes.response} variant="h6">{reponseAfterSend}</Typography>
                        </Grid>
                    </Grid>
                </div>

                :
                RenderElement()
            }
        </>

    );
}
export default AddPosts;