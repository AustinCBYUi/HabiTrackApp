const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  _id: {type: String},
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  frequency: { type: String, required: true },
  //'in-progress' | 'completed' | 'overdue'\\
  status: { type: String, required: true },
  completedDates: [Date],
});

module.exports = mongoose.model('Habit', HabitSchema);
