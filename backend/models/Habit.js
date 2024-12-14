const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  userId: {type: String, required: true },
  habitId: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  frequency: { type: String, required: true },
  //'in-progress' | 'completed' | 'overdue'\\
  status: { type: String },
  completedDates: [Date],
});

module.exports = mongoose.model('Habit', HabitSchema);
