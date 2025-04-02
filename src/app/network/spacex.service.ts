import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission';

@Injectable({ providedIn: 'root' })
export class SpacexService {
  private baseUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getAllMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.baseUrl);
  }

  getMissionsByYear(year: string): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.baseUrl}?launch_year=${year}`);
  }

  getMissionById(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.baseUrl}/${id}`);
  }
}