const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require ('knex');
const bcrypt = require ('bcrypt');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = knex ({
        client: 'pg',
        connection: {
          host : '127.0.0.1',
          user : 'mpp977',
          password : '',
          database : 'smart-brain'
        }
})

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res)=> {
    res.json('App is running');
})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {Image.handleImage(req, res, db)})

app.listen(3000, () => console.log('App is running! listening on port 3000!'))
