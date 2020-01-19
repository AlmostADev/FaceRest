const handleProfile = db => (req, res) => {
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
}

module.exports = {
    handleProfile: handleProfile
}