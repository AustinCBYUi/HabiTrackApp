export interface Habit {
  _id?: string;
  userId: string;
  title: string;
  description?: string;
  frequency: string;
  status: string;
  completedDates?: Date[];
}
