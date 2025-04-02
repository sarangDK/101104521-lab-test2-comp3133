import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpacexService } from '../network/spacex.service';
import { Mission } from '../models/mission';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="details-wrapper" *ngIf="mission">
      <mat-card class="details-card">
        <h2 class="title">SpaceX Mission Details</h2>
        <div class="content">
          <div class="image">
            <img [src]="mission.links.mission_patch_small" alt="Mission Patch" />
          </div>
          <div class="info">
            <h3 class="mission-name">Mission - {{ mission.mission_name }}</h3>
            <p><strong>Launch Year:</strong> {{ mission.launch_year }}</p>
            <p><strong>Rocket:</strong> {{ mission.rocket.rocket_name }} ({{ mission.rocket.rocket_type }})</p>
            <p><strong>Launch Site:</strong> Cape Canaveral (Example)</p>
          </div>
        </div>
        <div class="details-text">
          <h4>Launch Details</h4>
          <p>{{ mission.details || 'No additional details available.' }}</p>
        </div>
        <div class="links">
          <h4>More Info on Launch Details</h4>
          <a mat-icon-button color="primary" [href]="mission.links.article_link" target="_blank"><mat-icon>description</mat-icon></a>
          <a mat-icon-button color="accent" [href]="mission.links.wikipedia" target="_blank"><mat-icon>public</mat-icon></a>
          <a mat-icon-button color="warn" [href]="mission.links.video_link" target="_blank"><mat-icon>smart_display</mat-icon></a>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .details-wrapper {
      display: flex;
      justify-content: center;
      padding: 2rem;
    }

    .details-card {
      background-color: #fff3e0;
      padding: 2rem;
      max-width: 800px;
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .title {
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
    }

    .content {
      display: flex;
      gap: 2rem;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .image img {
      max-width: 150px;
      border-radius: 8px;
      background: #fff;
      padding: 0.5rem;
    }

    .info {
      flex: 1;
    }

    .mission-name {
      color: #d84315;
      margin-bottom: 0.5rem;
    }

    .details-text {
      margin: 1rem 0;
    }

    .links {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .links h4 {
      margin-right: 1rem;
    }

    a[mat-icon-button] {
      background: white;
      border-radius: 50%;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    }
  `]
})
export class MissionDetailsComponent implements OnInit {
  mission!: Mission;

  constructor(private route: ActivatedRoute, private spacexService: SpacexService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.spacexService.getMissionById(id).subscribe(data => this.mission = data);
  }
}
