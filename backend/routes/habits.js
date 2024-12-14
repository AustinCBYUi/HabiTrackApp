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
    const habit = new Habit(req.body);
    await habit.save();
    res.status(201).send(habit)
  } catch (err) {
    res.status(500).json({ error: 'Error creating Habit' });
  }
});


//DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleteHabit = await Habit.deleteOne(
      { habitId: req.params.id }
    );
    res.status(200).json(deleteHabit);
  } catch (err) {
    res.status(500).send({ error: 'Error deleting Habit' });
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const habit = await Habit.findOne({habitId: req.params.id});
    if (!habit) {
      return res.status(404).send('Habit not found');
    }
    res.status(200).send(habit);
  } catch (err) {
    console.error('Error fetching habbit:', err);
    res.status(500).send('Error fetching habit')
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedHabit = await Habit.updateOne(
      { habitId: req.params.id },
      {
        status: 'completed', },
      { new: true }
    );
    res.status(200).json(updatedHabit);
  } catch (err) {
    res.status(500).send({ error: 'Error updating Habit' });
  }
});

//PUT
router.put('/edit/:id', async (req, res) => {
  try {
    const updatedHabit = await Habit.updateOne(
      { habitId: req.params.id },
      {
        habitId: this.habitId,
        title: req.body.title,
        description: req.body.description,
        frequency: req.body.frequency,
        status: req.body.status, },
      { new: true }
    );
    res.status(200).json(updatedHabit);
  } catch (err) {
    res.status(500).send({ error: 'Error updating Habit' });
  }
});

module.exports = router;
