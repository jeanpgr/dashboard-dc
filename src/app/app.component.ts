import { Component } from '@angular/core';
import { GraphLineComponent } from './graph-line/graph-line.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GraphLineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pruebas';
}
