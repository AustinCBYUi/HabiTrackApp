export interface Habit {
  userId: string;
  habitId: string;
  title: string;
  description?: string;
  frequency: string;
  status: string;
  completedDates?: Date[];
}
