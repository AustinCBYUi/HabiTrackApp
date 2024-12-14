import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Habit } from '../../backend/models/habit.model';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private apiUrl = 'http://localhost:3000/habits';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  getHabits(userId: string): Observable<Habit[]> {
    return this.http.get<Habit[]>(`${this.apiUrl}/${userId}`);
  }

  getHabitById(id: string): Observable<Habit> {
    return this.http.get<Habit>(`${this.apiUrl}/edit/${id}`);
  }


  addHabit(habit: any) {
    return this.http.post(this.apiUrl, habit);
  }

  completeHabit(habit: any) {
    const updatedHabit = {
      status: 'complete'
    }
    return this.http.put(`${this.apiUrl}/${habit.habitId}`, updatedHabit);
  }

  updateHabit(id: string, habit: Habit) {
    return this.http.put(`${this.apiUrl}/edit/${id}`, habit);
  }

  deleteHabit(habit: any) {
    return this.http.delete(`${this.apiUrl}/${habit.habitId}`);
  }

  showSuccessMessage(msg: string) {
    this.successMessage = msg;
    setTimeout(() => {
      this.successMessage = null;
    }, 3500); //Displays for 3 1/2 seconds.
  }

  showErrorMessage(msg: string) {
    this.errorMessage = msg;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3500); //Displays for 3.5 seconds.
  }
}
