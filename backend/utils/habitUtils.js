
const getHabitStatus = (habit) => {
  try {
    const now = new Date();
    const startDate = new Date(habit.startDate);
    const lastCompletedDate = habit.lastCompletedDate && habit.lastCompletedDate !== ""
      ? new Date(habit.lastCompletedDate) : null;

    let nextDueDate;

    switch (habit.frequency) {
      case 'Daily':
        nextDueDate = lastCompletedDate ? new Date(lastCompletedDate) : startDate;
        nextDueDate.setDate(nextDueDate.getDate() + 1);
        break;
      //Questionable case.
      case 'Monday-Friday':
        nextDueDate = lastCompletedDate ? new Date(lastCompletedDate) : startDate;
        nextDueDate.setDate(nextDueDate.getDate() + 1);
        while (nextDueDate.getDay() === 0 || nextDueDate.getDay() === 6) { // Skip weekends
          nextDueDate.setDate(nextDueDate.getDate() + 1);
          if (nextDueDate > now) {
            break;
          }
        }
        break;
      case 'Weekly':
        nextDueDate = lastCompletedDate ? new Date(lastCompletedDate) : startDate;
        nextDueDate.setDate(nextDueDate.getDate() + 7);
        break;
      case 'Bi-Weekly':
        nextDueDate = lastCompletedDate ? new Date(lastCompletedDate) : startDate;
        nextDueDate.setDate(nextDueDate.getDate() + 14);
        break;
      case 'Monthly':
        nextDueDate = lastCompletedDate ? new Date(lastCompletedDate) : startDate;
        nextDueDate.setMonth(nextDueDate.getMonth() + 1);
        break;
      default:
        nextDueDate = startDate; //Fallback if frequency is not found
    }

    //Determining the habit status
    if (now >= nextDueDate) {
      // If today's date is greater than or equal to the next due date, it's overdue.
      return 'overdue';
    }

    if (habit.status === 'completed') {
      return 'completed';
    }

    //If the habit has not been completed yet (normally after creation) it should still display in-progress.
    if (!lastCompletedDate) {
      return 'in-progress';
    }

    // If the lastCompletedDate is set but it is not overdue yet, it should
    // still be set to in-progress.
    return 'in-progress';

  } catch (err) {
    console.error('Error in getHabitStatus for habit:', habit, err);
    return 'unknown';
  }
};

module.exports = { getHabitStatus };
