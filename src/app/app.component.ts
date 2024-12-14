import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HabitFormComponent } from './habit-form/habit-form.component';
import { HabitEditComponent } from './habit-edit/habit-edit.component';
import {NavigationComponent} from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    HabitFormComponent,
    NavigationComponent,
    HabitEditComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'habit-tracker';
}
