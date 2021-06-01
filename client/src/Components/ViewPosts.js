import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import '../App.css';
import { pink, green } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';
import OnePost from './OnePost';
import { useHistory } from 'react-router';


const ViewPosts = () => {
    const username = useSelector(state => state.authState.username);
    const token = useSelector(state => state.authState.token);
    const [initResponse, setInitResponse] = useState(null);
    const [posts, setPosts] = useState(null);
    const [flag, setFlag] = useState(false);
    const [open, setOpen] = useState(false);
    const history = useHistory();


    useEffect(() => {


        const post = { username: username, token: token };
        console.log("Token from viewposts.js: ", token)
        axios.post('https://blogman-server.herokuapp.com/myposts', { data: post })
            .then(res => {
                setInitResponse(res.data.message);
                setPosts(res.data.posts.reverse());
                console.log(res);
            })
            .catch(e => {
                history.push('/');
            })
    }, []);

    const handleFilter = (e) => {

        const data = { username: username, token: token };
        console.log("Token from viewposts.js: ", token)
        axios.post('https://blogman-server.herokuapp.com/myposts', { data: data })
            .then(res => {
                setInitResponse(res.data.message);
                setPosts(res.data.posts.reverse());
                console.log('Posts after forcing update: ', res);

                let finalPosts = [];
                console.log("Before reaaranging: ", posts);
                switch (e.target.value) {
                    case "LENGTH_L":
                        finalPosts = filterLtoS();
                        break;
                    case "LENGTH_S":
                        finalPosts = filterStoL();
                        break;
                    case "DATE":
                        finalPosts = res.data.posts.reverse();
                        break;
                }

                setPosts(finalPosts);
            })
            .catch(e => {
                console.log(e);
            })

        console.log("Filter method called!", e.target.value);

    }

    const filterLtoS = () => {
        let finalPosts = posts;
        for (let i = 0; i < finalPosts.length; i++) {
            for (let j = i + 1; j < finalPosts.length; j++) {
                if (finalPosts[i].length < finalPosts[j].length) {
                    let temp = finalPosts[i];
                    finalPosts[i] = finalPosts[j];
                    finalPosts[j] = temp;
                }
            }
        }
        return finalPosts;
    }

    const filterStoL = () => {
        let finalPosts = posts;
        for (let i = 0; i < finalPosts.length; i++) {
            for (let j = i + 1; j < finalPosts.length; j++) {
                if (finalPosts[i].length > finalPosts[j].length) {
                    let temp = finalPosts[i];
                    finalPosts[i] = finalPosts[j];
                    finalPosts[j] = temp;
                }
            }
        }
        return finalPosts;
    }


    const forceUpdateAfterDelete = () => {

        console.log('Force update called!');
        const post = { username: username, token: token };
        console.log("Token from viewposts.js: ", token)
        axios.post('https://calm-plateau-40983.herokuapp.com/myposts', { data: post })
            .then(res => {
                setInitResponse(res.data.message);
                setPosts(res.data.posts.reverse());
                console.log('Posts after forcing update: ', res);
                setOpen(true);

            })
            .catch(e => {
                console.log(e);
            })

    }

    return (

        <div className="myposts-wrapper" >
            <Container maxwidth="lg">
                <Grid container>
                    <Grid item xs={12} lg={12}>
                        <p class="myposts-heading">Welcome {username}!</p>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <p class="myposts-secondary">Here is a list of all your posts.</p>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <p>Sort by: </p>
                        <select className="filter-wrapper" onChange={handleFilter}>
                            <option value="DATE">Date Modified</option>
                            <option value="LENGTH_S">Length - Smallest</option>
                            <option value="LENGTH_L">Length - Largest</option>
                        </select>
                    </Grid>
                    {posts !== null ? <Grid item xs={12} lg={12} container style={{ margin: '0 auto', display: 'block' }}>

                        {posts.map(item => {
                            return <OnePost post={item} username={username} key={posts.indexOf(item)} forceUpdate={forceUpdateAfterDelete} />
                        })}

                    </Grid>
                        : null}
                    {open ? <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                        <Alert onClose={() => setOpen(false)} severity="success">
                            Post deleted!
                        </Alert>
                    </Snackbar> : null}
                </Grid>
            </Container>


        </div>
    );
}

export default ViewPosts;
