const handleRegister = db => (req, res) => {
    const { email, name, password } = req.body;
    db('users')
    .returning('*')
    .insert(
        {
            email: email,
            name: name,
            joined: new Date()
        }
    )
    .then(user => {
        res.json(user[0]);
    })
    .catch(err => res.status(400).json('Unable to register the new user'))
    res.json(db.users[db.users.length-1]);
}

module.exports = {
    handleRegister: handleRegister
};