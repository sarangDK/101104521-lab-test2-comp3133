import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MissionDetailsComponent } from './missiondetails.component';
import { ActivatedRoute } from '@angular/router';
import { SpacexService } from '../network/spacex.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

describe('MissiondetailsComponent', () => {
  let component: MissionDetailsComponent;
  let fixture: ComponentFixture<MissionDetailsComponent>;

  const mockSpacexService = {
    getMissionById: (id: number) => of({
      mission_name: 'Mock Mission',
      links: {
        mission_patch_small: 'mock-image-url',
        article_link: 'mock-article-url',
        wikipedia: 'mock-wikipedia-url',
        video_link: 'mock-video-url'
      },
      details: 'Mock mission details',
      rocket: {
        rocket_name: 'Mock Rocket',
        rocket_type: 'Mock Type'
      }
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionDetailsComponent, CommonModule, MatCardModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: SpacexService, useValue: mockSpacexService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});