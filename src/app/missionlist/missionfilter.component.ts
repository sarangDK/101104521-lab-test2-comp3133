import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, MatOptionModule],
  template: `
    <div class="filter-wrapper">
      <mat-form-field appearance="fill" class="filter-field">
        <mat-label>Filter by Year</mat-label>
        <mat-select [(ngModel)]="selectedYear" (selectionChange)="filter()">
          <mat-option *ngFor="let year of years" [value]="year">
            {{ year }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: [`
    .filter-wrapper {
      display: flex;
      justify-content: center;
      margin: 1rem 0 2rem;
    }

    .filter-field {
      width: 250px;
      background-color: #fff3e0;
      border-radius: 8px;
      padding: 0.5rem 1rem;
    }

    mat-label {
      font-weight: bold;
      color: #d84315;
    }

    mat-select {
      font-weight: 500;
    }
  `]
})
export class MissionFilterComponent {
  @Output() yearSelected = new EventEmitter<string>();

  years = Array.from({ length: 20 }, (_, i) => (2006 + i).toString());
  selectedYear = '2020';

  filter(): void {
    this.yearSelected.emit(this.selectedYear);
  }
}
