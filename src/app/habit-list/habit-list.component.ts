import { Component, OnInit } from '@angular/core';
import { HabitService } from '../habit.service';
import {Habit} from '../../../backend/models/habit.model';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-habit-list',
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  standalone: true,
  templateUrl: './habit-list.component.html',
  styleUrl: './habit-list.component.css'
})
export class HabitListComponent implements OnInit {
  habits: Habit[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  frequencyOrder = ['Daily', 'Monday-Friday', 'Weekly', 'Bi-Weekly', 'Monthly'];


  constructor(private habitService: HabitService) { }

  ngOnInit() {
    this.habitService.getHabits('0').subscribe(data => {
      this.habits = data.sort(
        (a, b) => this.frequencyOrder.indexOf(a.frequency) - this.frequencyOrder.indexOf(b.frequency)
      );
      this.successMessage = this.habitService.successMessage;
      this.errorMessage = this.habitService.errorMessage;
    })
  }


  markComplete(habit: any) {
    this.habitService.completeHabit(habit).subscribe(() => {
      this.habits = this.habits.filter(h => h.habitId !== habit.habitId);
      this.habitService.showSuccessMessage('Habit has been marked completed!');
      console.log('Habit marked as completed.')
      this.ngOnInit();
    })
  }


  deleteHabit(habit: any) {
    this.habitService.deleteHabit(habit).subscribe(() => {
      this.habits = this.habits.filter(h => h.habitId !== habit.habitId);
      this.habitService.showErrorMessage('Habit has been deleted successfully!');
    })
  }

}
