import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpacexService } from '../network/spacex.service';
import { Mission } from '../models/mission';
import { MatCardModule } from '@angular/material/card';
import { MissionFilterComponent } from './missionfilter.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MissionFilterComponent],
  template: `
    <h2 class="title">🚀 SpaceX Missions</h2>
    <app-missionfilter (yearSelected)="onYearSelected($event)"></app-missionfilter>
    <div class="mission-grid">
      <mat-card *ngFor="let mission of missions" class="mission-card">
        <img mat-card-image [src]="mission.links.mission_patch_small" />
        <mat-card-header>
          <mat-card-title class="mission-name">{{ mission.mission_name }}</mat-card-title>
          <mat-card-subtitle>{{ mission.launch_year }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p><strong>Rocket:</strong> {{ mission.rocket.rocket_name }} ({{ mission.rocket.rocket_type }})</p>
          <p><strong>Launch Year:</strong> {{ mission.launch_year }}</p>
          <p><strong>Successful Launch:</strong> {{ mission.launch_success ? 'Yes' : 'No' }}</p>
          <p><strong>Successful Landing:</strong> {{ mission.rocket.first_stage.cores[0].land_success ? 'Yes' : 'No' }}</p>
        </mat-card-content>
        <mat-card-actions align="end">
          <a mat-button color="primary" [routerLink]="['/details', mission.flight_number]">
  
            View Details
          </a>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .title {
      text-align: center;
      font-size: 2rem;
      margin: 1rem 0;
    }

    .mission-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      padding: 2rem;
    }

    .mission-card {
      background-color: #fff8e1;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      transition: transform 0.2s ease, box-shadow 0.2s;
    }

    .mission-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }

    .mission-card img {
      height: 160px;
      object-fit: contain;
      background: white;
      padding: 0.5rem;
    }

    .mission-name {
      color: #d84315;
    }

    mat-card-content p {
      margin: 0.5rem 0;
    }

    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      padding-right: 1rem;
    }
  `],
})
export class MissionListComponent implements OnInit {
  missions: Mission[] = [];

  constructor(private spacexService: SpacexService) {}

  ngOnInit(): void {
    this.spacexService.getAllMissions().subscribe({
      next: data => {
        console.log('Missions fetched:', data);
        this.missions = data;
      },
      error: err => {
        console.error('API error:', err);
      }
    });
  }

  onYearSelected(year: string): void {
    this.spacexService.getMissionsByYear(year).subscribe(data => this.missions = data);
  }
}
