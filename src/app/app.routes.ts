import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HabitFormComponent} from './habit-form/habit-form.component';
import {HabitListComponent} from './habit-list/habit-list.component';
import { HabitEditComponent } from './habit-edit/habit-edit.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add-habit', component: HabitFormComponent },
  { path: 'habits/edit/:id', component: HabitEditComponent },
  { path: 'habits', component: HabitListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
