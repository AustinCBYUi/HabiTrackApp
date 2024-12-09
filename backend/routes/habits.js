const express = require('express');
const Habit = require('../models/Habit');
const router = express.Router();


//Get all habits for a user.
router.get('/:userId', async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.params.userId });
    res.json(habits);
  } catch (err) {
    res.status(404).json({ error: 'Error fetching habits..' })
  }
});

//POST
router.post('/', async (req, res) => {
  try {
    const newHabit = new Habit(req.body);
    const savedHabit = await newHabit.save();
    res.json(savedHabit);
  } catch (err) {
    res.status(500).json({ error: 'Error creating Habit' });
  }
});

//PUT
router.put('/:id', async (req, res) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true}
  );
    res.status(200).json(updatedHabit);
  } catch (err) {
    res.status(500).send({ error: 'Error updating Habit' });
  }
});

module.exports = router;
