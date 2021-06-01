import React from 'react';
import {Grid, makeStyles, Typography} from '@material-ui/core';
import {MakeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({

    wrapper: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #da22ff, #9733ee)',
    },
    text: {
        fontFamily: 'Lato'
    }


}))

const Warning = (props) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.wrapper}>
            <Grid item>
                <Typography gutterBottom variant="h3" className={classes.text}>{props.msg}</Typography>
            </Grid>
            <Grid item>
                <a href="/" style={{textDecoration: 'none'}}><Button variant="contained" color="secondary" size="large">Login</Button></a>
            </Grid>
        </Grid>
    );
}
export default Warning;