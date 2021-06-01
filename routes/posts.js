const express = require('express');
const post = express.Router();
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken');
const schema = require('../model/User');
const mongoose = require('mongoose');
const Filter = require('bad-words');

post.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

post.post('/posts', (req, res) => {
    const user_token = req.body.token;
    if (!user_token) return res.json({message: "Auth-token doesn't exist!"});

    try {
        const isCorrect = jwt.verify(user_token, process.env.SECRET_TOKEN);
        console.log(isCorrect);
        return res.json({message: 'Verified!'});
    }
    catch (e) {
        return res.json({message: 'jwt malformed'})
    }
});
post.post('/addpost', async (req, res) => {
    const { postContent, username } = req.body.data;

    const filter = new Filter();
    const cleanPost = filter.clean(postContent);


    const User = await mongoose.model('User', schema);
    const currentUser = await User.findOne({ username: username });
    const existingPosts = currentUser.posts;
    existingPosts.push(cleanPost);
    currentUser.posts = existingPosts;

    try {
        const newUser = await currentUser.save();
        return res.json({message: 'success'});
    } catch (e) {
        console.log(e);
    }

});
post.post('/myposts', async (req, res) => {
    const { username } = req.body.data;

    const User = await mongoose.model('User', schema);
    const currentUser = await User.findOne({username: username});
    return res.json({posts: currentUser.posts});

});
post.post('/deletepost', async (req, res) => {
    const { username, post } = req.body.data;

    const User = await mongoose.model('User', schema);
    const currentUser = await User.findOne({username: username});
    let i = 0;
    for (i=0; i<currentUser.posts.length; i++){
        if (currentUser.posts[i] === post) {
            currentUser.posts.splice(i, 1);
        }
    }
    try {
        const newUser = await currentUser.save();
        console.log('updated!');
        return res.send({message: 'updated'});
    } catch (e) {
        console.log(e);
    }

})
module.exports = post;