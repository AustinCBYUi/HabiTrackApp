import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import {NavigationComponent} from './navigation/navigation.component';
import {FooterComponent} from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    NavigationComponent,
    FooterComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'habit-tracker';
}
