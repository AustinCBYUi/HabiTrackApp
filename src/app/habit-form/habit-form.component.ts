import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HabitService } from '../habit.service';
import { NgIf } from '@angular/common';

export interface Habit {
  userId: string;
  habitId: string;
  title: string;
  description: string;
  frequency: string;
  status: string;
  startDate: string;
}

@Component({
  selector: 'app-habit-form',
  standalone: true,
  templateUrl: './habit-form.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrl: './habit-form.component.css'
})
export class HabitFormComponent {
  date = new Date();
  getToday = this.date.getDate().toString();
  habit: Habit = {
    userId: '',
    habitId: '',
    title: '',
    description: '',
    frequency: 'Select a Frequency',
    status: '',
    startDate: this.getToday
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private habitService: HabitService) {
    this.habit = {
      userId: '0',
      habitId: '',
      title: this.habit.title,
      description: this.habit.description,
      frequency: this.habit.frequency,
      status: 'in-progress',
      startDate: ''
    };
  }

  addHabit() {
    this.habit.habitId = Math.random().toString(36).substr(2, 10);
    this.habitService.addHabit(this.habit).subscribe(
      (response) => {
      this.successMessage = 'Habit added successfully!';
      this.errorMessage = null;
      console.log('Habit added:', response)
    }, (error) => {
      this.errorMessage = 'Failed to add habit..';
      this.successMessage = null;
      console.error('Error adding habit:', error);
    })
  }
}
