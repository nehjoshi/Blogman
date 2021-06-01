const express = require('express');
const router = express.Router();
const joi = require('joi');
const mongoose = require('mongoose');
const { regVal } = require('../validation');
const bcrypt = require('bcryptjs');
const schema = require('../model/User');
const dotenv = require('dotenv');

router.post('/register', async (req, res) => {

    const { email, username, password, otp, tryOtp } = req.body;



    if (otp !== tryOtp) { return res.json({ message: 'Incorrect OTP' }) }

    else {

        const User = await mongoose.model('User', schema);
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const newUser = new User({
            email: email,
            username: username,
            password: hashed
        });


        try {
            const addedUser = await newUser.save();
            console.log(addedUser._id);
            return res.json({message: 'User Registration Successful'});
        } catch (e) {
            console.log(e);
        }
    }
});

module.exports = router;