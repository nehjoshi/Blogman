const express = require('express');
const setNumberRouter = express.Router();
const { regVal } = require('../validation');
const schema = require('../model/User');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

const mongoose = require('mongoose');

setNumberRouter.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

setNumberRouter.post('/getnumber', async (req, res) => {
    const { email, username, password, } =  req.body;
    console.log('Email coming to server: ', email);
    const User = await mongoose.model('User', schema);

    const error = regVal({email: email, username: username, password: password});
    console.log(error);     
    if(error) return res.json({message: error.details[0].message});

    const emailExists = await User.findOne({email: email});
    if (emailExists) return res.json({message: 'Email already exists. Please enter another email'});

    const randomNumber = Math.floor(Math.random() * (999999 - 100000) + 100000);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth : {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'nehjoshi5@gmail.com',
        to: `${email}`,
        subject: 'Registration for Blog Creator',
        html: `
        <h4>Dear ${username},</h4>
        <p>Thank you for registering with BlogMan. Please enter the following token to complete the registration.</p>
        <strong>Your secret One Time Password (OTP) is ${randomNumber}.</strong><br /><br />
        <p style={font-size: 10px}>This was an automatically generated email. If you have not registered, please ignore this email. We apologize for the inconvenience caused</p>
        <h4>Team,</h4>
        <h4 style={text-align: center}>BlogCreator</h4>
        `,
        
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {console.log("Error" + err)}
        else {
            console.log(info);
            return res.json({message: 'Email sent', otp: randomNumber});
        }
    })

    
})
module.exports = setNumberRouter;