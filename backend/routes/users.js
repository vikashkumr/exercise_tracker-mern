const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/',(req, res, next) => {
    User.find()
    .exec()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add',(req, res, next) => {
    const newUser = new User({username: req.body.username});
    newUser.save()
    .then(() => res.json('user added'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;