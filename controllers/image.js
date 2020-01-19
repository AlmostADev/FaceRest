const handleImage = db => (req, res) => {
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
}

module.exports = {
    handleImage: handleImage
}