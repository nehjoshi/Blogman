import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({

    wrapper: {
        position: 'absolute',
        left: '0',
        top: '70px',
        padding: '60px 5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(42, 42, 68)',
        width: '50%',
        height: '100vh',
        zIndex: '1000',
        transitionTimingFunction: 'ease-in',
        transition: '0.2s'
    },
    link: {
        color: 'white',
        margin: '40px',
        fontSize: '1rem'
    },
    close: {
        position: 'absolute',
        top: '0',
        right: '0',
        padding: '5px 5px',
        '&:hover': {
            cursor: 'pointer'
        }
    }

}))

const Sidebar = (props) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.wrapper}>
            <Grid item className={classes.close}>
                <CloseIcon fontSize="large" onClick={props.toggle} />
            </Grid>
            <Grid item>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}><Typography variant="h6" className={classes.link} onClick={props.toggle}>Home</Typography></Link>
            </Grid>

            <Grid item>
                <Link to='/addpost' style={{ textDecoration: 'none', color: 'white' }}><Typography variant="h6" className={classes.link} onClick={props.toggle}>Add A Post</Typography></Link>
            </Grid>
            <Grid item>
                <Link to='/myposts' style={{ textDecoration: 'none', color: 'white' }}><Typography variant="h6" className={classes.link} onClick={props.toggle}>View Posts</Typography></Link>
            </Grid>
        </Grid>
    )
}
export default Sidebar;