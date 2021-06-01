import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import favicon from '../favicon1.png';
import '../App.css';
const Navbar = () => {
    return (
            <AppBar position="fixed">
                <Toolbar style={{ background: 'rgb(42, 42, 68)' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" className="nav-logo">
                        <Link to="/" style={{color: 'inherit'}}><img src={favicon} height="45px"/></Link>
                        
                    </IconButton>
                    <Button color="inherit" className="navbar-add">
                        <Link to='/addpost' style={{ textDecoration: 'none', color: 'white' }}>Add a post</Link>
                    </Button>
                    <Button color="inherit" className="navbar-posts">
                        <Link to='/myposts' style={{ textDecoration: 'none', color: 'white' }}>View Posts
                        </Link></Button>
                </Toolbar>
            </AppBar>
    );
}
export default Navbar;