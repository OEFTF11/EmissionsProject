import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmissionRecord {
  id: number;
  facility: string;
  sourceType: string;
  co2TonsPerYear: number;
  year: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmissionsService {
  private readonly apiUrl = 'http://localhost:5067/api/Emissions';

  constructor(private http: HttpClient) {}

  getEmissions(): Observable<EmissionRecord[]> {
    return this.http.get<EmissionRecord[]>(this.apiUrl);
  }
}
