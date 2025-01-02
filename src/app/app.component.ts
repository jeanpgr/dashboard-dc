import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { GraphLineComponent } from './graph-line/graph-line.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchFilterComponent, GraphLineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pruebas';
}
