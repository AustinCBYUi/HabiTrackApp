import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitService } from '../habit.service'
import { Habit } from '../../../backend/models/habit.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-habit-edit',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './habit-edit.component.html',
  styleUrl: './habit-edit.component.css'
})
export class HabitEditComponent implements OnInit {
  habit: Habit = { userId: '', habitId: '', title: '', description: '', frequency: '', status: 'Select a Status' };
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private habitService: HabitService,
    private route: ActivatedRoute, //Huh
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadHabit(id);
    }
  }

  loadHabit(id: string) {
    this.habitService.getHabitById(id).subscribe((habitData) => {
      this.habit = habitData;
    },
      (error) => {
        console.error('Error loading habit: ', error);
        this.habitService.showErrorMessage('Failed to load habit..')
      })
  }

  saveChanges() {
    if (this.habit.title && this.habit.description) {
      this.habitService.updateHabit(this.habit.habitId, this.habit).subscribe(
        (response) => {
          this.habitService.showSuccessMessage('Habit updated successfully.');
          this.router.navigate(['/habits']).then();
      },
        (error) => {
          console.error('Error updating habit:', error);
          this.habitService.showErrorMessage('Failed to update habit..')
        });
    } else {
      this.habitService.showErrorMessage('Please fill in all fields.')
    }
  }
}
