
const getHabitStatus = (habit) => {
  try {
    const now = new Date();
    const startDate = new Date(habit.startDate);
    const lastCompletedDate = habit.lastCompletedDate && habit.lastCompletedDate !== ""
      ? new Date(habit.lastCompletedDate) : null;

    let nextDueDate;
    let overdueDate; //Only for Daily

    switch (habit.frequency) {
      //I guess technically Daily is a bi-daily due to the nature of how I want it to work.
      case 'Daily':
        /*
        * When a daily habit is created, it will always set the time to 0700.
        * If we want color-satisfaction, if a habit is marked complete for the
        * day, it should remain green for that entire day (24-hrs after the creation/completed date).
        * After that 24-hour window (into after the 24-hour window of creation/completed), the
        * status should be in-progress. This then gives you another 24 hours to complete the habit
        * before it is turned to overdue, which would be 48 hours after creation / last completion.
         */

        nextDueDate = lastCompletedDate ? new Date(lastCompletedDate) : startDate;
        //If a habit was made Monday and was completed the same day, we would want the habit
        //completed within 24 hours of the last completion,
        nextDueDate.setDate(nextDueDate.getDate() + 1);

        //Adding 1 to the original due date, this is supposed to be for
        // a 24-hour period where the habit is in-progress.
        overdueDate = lastCompletedDate ? new Date(lastCompletedDate) : startDate;
        overdueDate.setDate(overdueDate.getDate() + 2);

        //Check if there is a completeddate and if that completed date is less than or equal to next due date's time.
        // AND we must check if right now is less than or equal to next due date's time.
        if (lastCompletedDate && lastCompletedDate.getTime() <= nextDueDate.getTime() && now.getTime() <= nextDueDate.getTime()) {
          return 'completed';
          //Just check if now is less than the 'actual' overdue date (two days away from the start OR last completed date).
        } else if (now.getTime() < overdueDate.getTime()) {
          return 'in-progress';
          //Catch all, should be overdue if it doesn't match any others.
        } else {
          return 'overdue';
        }
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


    //If the habit has not been completed yet (normally after creation) it should still display in-progress.
    if (!lastCompletedDate || lastCompletedDate <= nextDueDate || now < nextDueDate) {
      return 'in-progress';
    }

    // If the lastCompletedDate is set, but it is not overdue yet, it should
    // still be set to in-progress.
    return 'in-progress';

  } catch (err) {
    console.error('Error in getHabitStatus for habit:', habit, err);
    return 'unknown';
  }
};

module.exports = { getHabitStatus };
