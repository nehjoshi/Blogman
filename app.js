const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const schema = require('./model/User');
const app = express();
const Register = require('./routes/register');
const path = require('path');
const post = require('./routes/posts');
const cors = require('cors');
 const getNumber = require('./routes/getNumber');
port = process.env.PORT || 5000;

dotenv.config();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('App is working!');
})

const corsOptions = {
    origin: 'https://blogman-blogs.netlify.app',
    methods: ['GET', 'POST']        //Setting CORS
}

app.use(cors());
app.use('/', Register);
app.use('/', post);
app.use('/', getNumber);

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});

app.post('/fetch', async (req, res) => {
    const {username, password} = req.body;

    const User = await mongoose.model('User', schema);
    const user = await User.findOne({username: username});

    if(!user) return res.send('The username does not exist');

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) return res.send('Invalid password');

    const token = await jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);
    res.header('auth-token', token).send(token)

});


app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});