const handleRegister = db => (req, res) => {
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
}

module.exports = {
    handleRegister: handleRegister
};