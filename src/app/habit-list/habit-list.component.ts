import { Component, OnInit } from '@angular/core';
import { HabitService } from '../habit.service';
import {Habit} from '../../../backend/models/habit.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-habit-list',
  imports: [
    NgForOf,
    NgIf
  ],
  standalone: true,
  templateUrl: './habit-list.component.html',
  styleUrl: './habit-list.component.css'
})
export class HabitListComponent implements OnInit {
  habits: Habit[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;


  constructor(private habitService: HabitService) { }

  ngOnInit() {
    this.habitService.getHabits('0').subscribe(data => {
      this.habits = data;
      this.successMessage = this.habitService.successMessage;
      this.errorMessage = this.habitService.errorMessage;
    })
  }


  markComplete(habit: any) {
    this.habitService.completeHabit(habit).subscribe(() => {
      this.habitService.showSuccessMessage('Habit has been marked completed!');
      console.log('Habit marked as completed.')
    })
  }


  editHabit(habit: any) {
    alert(`Edit Habit: ${habit.title}`);
  }


  deleteHabit(habit: any) {
    this.habitService.deleteHabit(habit._id!).subscribe(() => {
      this.habits = this.habits.filter(h => h._id !== habit._id);
      this.habitService.showErrorMessage('Habit has been deleted successfully!');
    })
  }
}
