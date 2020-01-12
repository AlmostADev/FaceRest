const express = require('express');
const bodyP = require('body-parser');
const app = express();

app.use(bodyP.json());

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

app.get('/', (req, res) => {
    res.json(db.users);
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    db.users[0].email === email && db.users[0].password === password ? res.json('Signin...') : res.status(400).json('you cannot signing...')
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    db.users.push(
        {
            id: '126', //This should be an incremental key when you using a database, most of the time can be a primary key of table, but just a example...
            name: name,
            email: email,
            password: password, //in the future this gonna be a hashkey, never grab password harcoded!
            counter: 0,
            registered: new Date()
        }
    )
    res.json(db.users[db.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    db.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if(!found) {
        res.status(404).json('user not found');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    db.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.counter++;
            return res.json(user.entries);
        }
    })
    if(!found) {
        res.status(400).json('there is something worng with the image that you provide');
    }
})


app.listen(process.env.PORT || 3000 , () => console.log(`Server running ...`));