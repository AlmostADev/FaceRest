const handleRegister = (db, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;
    const hashPassword = bcrypt.hashSync(password);
    db.transaction(logTX => {
        logTX.insert({
            hash: hashPassword,
            email: email
        })
        .into('login')
        .returning('email')
        .then(emailLog => {
            return logTX('users')
            .returning('*')
            .insert(
                {
                    email: emailLog[0],
                    name: name,
                    joined: new Date()
                }
            )
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(logTX.commit)
        .catch(logTX.rollback)
    })
    .catch(err => res.status(400).json('Unable to register the new user'))
}

module.exports = {
    handleRegister: handleRegister
};