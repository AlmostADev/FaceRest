const express = require('express');
const bodyP = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const app = express();

//controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

app.use(bodyP.json());
app.use(cors());

const pg = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1234',
      database : 'faceRecog'
    }
});

pg.select('*').from('users').then(data => console.log(data));

app.get('/', (req, res) => pg.select('*').from('users').then(data => res.json(data)))

//API endpoints using dependency injection, it's a way more cleaner to do this ...
app.post('/signin',signin.handleSignIn(pg, bcrypt))
app.post('/register', register.handleRegister(pg, bcrypt)) 
app.get('/profile/:id', profile.handleProfile(pg))
app.put('/image', image.handleImage(pg))

app.listen(process.env.PORT || 3001, () => console.log(`Server running ...`));