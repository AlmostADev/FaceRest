const express = require('express');
const bodyP = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const app = express();

//controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

app.use(bodyP.json());
app.use(cors());

const db = {
    users: [
        {
            id: '123',
            name: 'Alejandro',
            email: 'alejandro@mail.com',
            password: '123',
            counter: 0,
            registered: new Date()
        },
        {
            id: '124',
            name: 'Karina',
            email: 'karina@mail.com',
            password: '124',
            counter: 0,
            registered: new Date()
        },
        {
            id: '125',
            name: 'Tamara',
            email: 'tamara@mail.com',
            password: '125',
            counter: 0,
            registered: new Date()
        }
    ]
}

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

app.get('/', (req, res) => {
    pg.select('*')
    .from('users')
    .then(data => res.json(data));
    
})

//API endpoints using dependency injection, it's a way more cleaner to do this ...
app.post('/signin',signin.handleSignIn(db))
app.post('/register', register.handleRegister(pg)) 
app.get('/profile/:id', profile.handleProfile(pg))
app.put('/image', image.handleImage(pg))

app.listen(process.env.PORT || 3001, () => console.log(`Server running ...`));