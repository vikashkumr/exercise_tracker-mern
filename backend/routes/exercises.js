const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise.model');

router.get('/',(req, res, next) => {
    Exercise.find()
    .exec()
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res, next) => {
    Exercise.findById(req.params.id)
    .exec()
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/:id', (req, res, next) => {
    Exercise.findByIdAndDelete(req.params.id)
    .exec()
    .then(exercise => res.json('Exercise deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/update/:id', (req, res, next) => {
    Exercise.findById(req.params.id)
    .exec()
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = req.body.duration;
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/add',(req, res, next) => {
    const newExercise = new Exercise({
        username: req.body.username, 
        description: req.body.description, 
        duration: Number(req.body.duration), 
        date: Date.parse(req.body.date)
    });
    
    newExercise.save()
    .then(() => res.json('exercises added'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;