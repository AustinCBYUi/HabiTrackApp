import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HabitService } from '../habit.service';
import {NgIf} from '@angular/common';

export interface Habit {
  userId: string;
  title: string;
  description: string;
  frequency: string;
  status: string;
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
  habit: Habit = {
    userId: '',
    title: '',
    description: '',
    frequency: 'Select a Frequency',
    status: ''
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private habitService: HabitService) {
    this.habit = {
      userId: '0',
      title: this.habit.title,
      description: this.habit.description,
      frequency: this.habit.frequency,
      status: 'in-progress'
    };
  }

  addHabit() {
    this.habitService.addHabit(this.habit).subscribe((response) => {
      this.successMessage = 'Habit added successfully!';
      this.errorMessage = null;
      console.log('Habit added:', response)
    }, (error) => {
      this.errorMessage = 'Failed to add habit..';
      this.successMessage = null;
    })
  }
}
