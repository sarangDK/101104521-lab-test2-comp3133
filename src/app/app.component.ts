import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">COMP 3133 - SpaceX Missions</mat-toolbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
