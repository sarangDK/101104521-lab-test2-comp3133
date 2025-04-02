import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Routes } from '@angular/router';
import { MissionListComponent } from './missionlist/missionlist.component';
import { MissionFilterComponent } from './missionlist/missionfilter.component';
import { MissionDetailsComponent } from './missiondetails/missiondetails.component';

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom([
      MatToolbarModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatOptionModule,
    ]),
    provideRouter([
      { path: '', component: MissionListComponent },
      { path: 'details/:id', component: MissionDetailsComponent },
    ] as Routes),
  ],
};
