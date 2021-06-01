import React, { useState, } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import Register from './Register';
import axios from 'axios';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { indigo } from '@material-ui/core/colors';
import blogImage from '../blog-image.png';
import blogImage2 from '../blog-image2.png';
import blogImage3 from '../blog-image3.png';
import store from '../store.js';
import authAction from '../redux/actions/authAction';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faEdit, faLock, faPen, faBook, faKey} from '@fortawesome/free-solid-svg-icons'
import {faFacebookSquare, faInstagramSquare, faTwitterSquare} from '@fortawesome/free-brands-svg-icons';
import Loader from './CircularLoader';




const Main = () => {
  const [username, updateUsername] = useState('');  //This is where we are storing the input
  const [password, updatePassWord] = useState('');
  const [error, setError] = useState(null);
  const [token, updateToken] = useState('');
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  //const main_url = "https://calm-plateau-40983.herokuapp.com/";
  const local = 'https://localhost:5000/fetch';

  const handleChangeUsername = (e) => {     //Handling username text field
    const temp = e.target.value;
    updateUsername(temp);

  }
  const handleChangePassword = (e) => {     //Handling password text field
    const temp = e.target.value;
    updatePassWord(temp);
  }

  const handleClick = () => {
    setLoader(true);
    const post = { username: username, password: password };    //Handling the login request and response
    axios.post('https://blogman-server.herokuapp.com/fetch', post)
      .then(res => {
        console.log(res);
        if (res.data !== 'Invalid password' && res.data !== 'The username does not exist') {
          updateToken(res.data);
          setError(null);
          setError('Successfully Logged In');
          store.dispatch(authAction(username, res.data));     //Updating the store with the username and jwt token
          setLoader(false);
          history.push('/addpost');
        }
        else {
          setError(null);
          setError('Invalid Username or Password');
          console.log(error);
        }
      })
      .catch(e => {
      })
  }

  const useStyles = makeStyles({
    root: {
      height: 1000
    }
  })

  const theme = createMuiTheme({    //Creating the main color theme of the page

    palette: {
      primary: {
        main: '#ffebee'
      },
      secondary: indigo,
    }
  });

  return (

    <ThemeProvider theme={theme}>
      <Route path='/register' component={Register} />
      <div className="content-wrapper main-screen" ><br />

        <Container maxWidth="lg"  >   {/*Login page start */}
          <Grid container justify={"center"} alignItems={"center"} style={{ height: '80vh' }}>
            <Grid item lg={6} xs={12}>
              <Grid container spacing={2} direction='column' alignItems={'center'} justify={'center'} >
                <Grid item >
                  <p className="login-intro-text-heading">Creating Blog Posts has never been easier.</p>
                </Grid>
                <Grid item>
                  <p className="login-intro-text-secondary">Create your blog post now for free.</p>
                </Grid><br />
              </Grid>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Grid container direction={'column'} alignItems={'center'} justify='center' >
                <Grid Item>
                  <TextField
                    color="primary"
                    type="text"
                    onChange={handleChangeUsername}
                    placeholder="Username"
                    variant="outlined"
                    label="Username" />
                </Grid><br></br>
                <Grid item>
                  <TextField
                    color="primary"
                    type="password"
                    onChange={handleChangePassword}
                    placeholder="Password"
                    variant="outlined"
                    label="Password" />
                </Grid><br></br>
                <Grid item>
                  <button
                    className="submit-button"
                    onClick={handleClick}>
                    Login
                    </button>
                </Grid><br />
                {loader ? <Grid item>
                  <Loader />
                </Grid> : null}
                <Grid item>
                  <p className="register-ask">Don't have an account? Register now:</p><br />
                </Grid>
                <Grid item>
                  <button className="submit-button submit-register">
                    <Link to='/register' style={{ textDecoration: 'none', color: 'inherit' }}>Register</Link></button>
                </Grid><br />
                <Grid item>
                  {error ? <p className="invalid">{error}</p> : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container><br /><br /><br />  {/*Login page end*/}

        <div className="page2">   {/*Information page start*/}
          <Container maxWidth="lg" className="info-page2-wrapper">
            <Grid container alignItems="center" style={{ height: 'auto', padding: '40px' }}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <img src={blogImage} className="blog-image" />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <h1 style={{ textAlign: 'center' }} className="main-page2-heading">The future of blogging</h1><br /><br />
                <p style={{ textAlign: 'center' }} className="main-page2-p">By far the safest, most reliable and award winning platform for all types of blogging.</p>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} style={{ paddingBottom: '20px' }}>
                <img src={blogImage2} className="blog-image2" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} >
                <h1 style={{ textAlign: 'center' }} className="main-page2-heading">The best, for the best</h1><br /><br />
                <p style={{ textAlign: 'center' }} className="main-page2-p">A revolution in online blogging. A new, future-first perspective.</p>
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <img src={blogImage3} className="blog-image3" />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <h1 style={{ textAlign: 'center' }} className="main-page2-heading">The future of blogging</h1><br /><br />
                <p style={{ textAlign: 'center' }} className="main-page2-p">By far the safest, most reliable and award winning platform for all types of blogging.</p>
              </Grid>
            </Grid>
          </Container>
        </div> {/*Information page end */}
        
        <div className="page3">   {/*The four icons page start*/}
          <Container maxWidth="lg">
            <Grid container alignItems="center" direction="row" style={{ height: 'fit-content' , padding: '50px', width: '100%', margin: '0 auto', }} spacing={8}>
            <Grid item sm={12} md={12}>
            <p className="page3-heading">The Best All In One Package you could ever wish for!</p>
            </Grid>
            <Grid item xs={12} md={12}>
              <p className = "page3-text">BlogMaker is the <strong>best free </strong>
              blog creator website on the internet. And we focus our attention on four things: your security, your creativity, your accessibility, and your privacy. </p>
            </Grid>
              <Grid item sm={3} xs={12} container justify="center">
                <div class="icon icon1">
                  <FontAwesomeIcon icon={faLock} size="5x" color="white" />
                </div>
              </Grid><br/><br/>
              <Grid item sm={3} xs={12} container justify="center">
                <div className="icon icon2">
                  <FontAwesomeIcon icon={faEdit} size="5x" color="white" />
                </div>
              </Grid><br/><br/>
              <Grid item sm={3} xs={12} container justify="center">
                <div className="icon icon3">
                  <FontAwesomeIcon icon={faBook} size="5x" color="white" />
                </div>
              </Grid><br/><br/>
              <Grid item sm={3} xs={12} container justify="center">
                <div className="icon icon4">
                  <FontAwesomeIcon icon={faKey} size="5x" color="white" />
                </div>
              </Grid><br/><br/>
            </Grid>
          </Container>
        </div> {/*The four icons page end*/}

      <footer className="footer">   {/*Footer start */}
        <Container maxWidth="lg">
          <Grid container justify="center" style={{height: 'fit-content', padding: '40px'}}>
            <Grid item xs={12} sm={12}>
              <p className="footer-text">Copyright: BlogMan™ and all logos have been trademarked.</p><br/><br/>
            </Grid>
            <Grid item xs={12} sm={12}>
              <p className="footer-text">Created with ❤ by Neh Joshi.</p><br/><br/>
            </Grid>
            <Grid item xs={12} sm={12}>
              <p className="footer-text">Wanna know more about me? Find me on social media:</p><br/>
            </Grid>
            <Container maxWidth="xs">
            <Grid item xs={12} sm={12} container alignItems="center" justify="center">
              <Grid item xs={3} md={3}>
              <a href="https://www.instagram.com/neh.joshi.98/" style={{color: 'black'}}>
                <FontAwesomeIcon icon={faInstagramSquare} size="3x" style={{margin: '0 auto', display: 'block'}} />
                </a>
              </Grid>
              <Grid item xs={3} md={3}>
              <a href="https://www.facebook.com/neh.joshi.98" style={{color: 'black'}}>
                <FontAwesomeIcon icon={faFacebookSquare}   size="3x" style={{margin: '0 auto', display: 'block'}} />
                </a>
              </Grid>
              <Grid item xs={3} md={3}>
                <FontAwesomeIcon icon={faTwitterSquare}   size="3x" style={{margin: '0 auto', display: 'block'}} />
              </Grid>
              <Grid item xs={3} md={3}>
                <FontAwesomeIcon icon={faInstagramSquare}  size="3x" style={{margin: '0 auto', display: 'block'}}/>
              </Grid>
            </Grid>
            </Container>
          </Grid>
        </Container>
      </footer>   {/*Footer end */}

      </div>  {/*Root end */}

    </ThemeProvider>

  );
}

export default Main;