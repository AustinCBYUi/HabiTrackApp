import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HabitFormComponent} from './habit-form/habit-form.component';
import {HabitListComponent} from './habit-list/habit-list.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add-habit', component: HabitFormComponent },
  { path: 'habits', component: HabitListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
