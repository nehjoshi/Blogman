import React, { useState } from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import '../App.css';
import { Grid, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, TextField } from '@material-ui/core';

const OnePost = (props) => {

    const [open, setOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteUsername = (e) => {
        const temp = e.target.value;

        console.log(temp);
        if (temp === props.username) {
            setConfirmDelete(true);
        }
        else {
            setConfirmDelete(false);
        }

    }

    const handleDelete = () => {
        const data = {
            username: props.username,
            post: props.post
        }
        setOpen(false);
        axios.post('/deletepost', { data: data })
            .then(res => {
                console.log('Response after deleting: ', res);
                console.log('Clossing dialog box');
                
                props.forceUpdate();
            })
            .catch(e => {
                console.log(e);
            })

    }

    return (
        <div className="individual-post-wrapper">
            <Grid item xs={12} sm={12} lg={12}>
                <p className="post-text">{props.post}</p>
            </Grid>
            <Grid item >
                <DeleteIcon className="delete-icon" onClick={handleClickOpen} />
            </Grid>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your username to delete this post. Note: deletion of posts cannot be undone.
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Username"
                        onChange={handleDeleteUsername}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    {confirmDelete === true ?
                        <Button onClick={handleDelete} color="primary">
                            Delete
          </Button> : null}
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>

                </DialogActions>
            </Dialog>

        </div>

    );
}
export default OnePost;