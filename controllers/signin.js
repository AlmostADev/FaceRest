const handleSignIn = db => (req, res) => {
    const { email, password } = req.body;
    db.users[0].email === email && db.users[0].password === password ? res.json('Signin...') : res.status(400).json('you cannot signing...')
}

module.exports = {
    handleSignIn: handleSignIn
}