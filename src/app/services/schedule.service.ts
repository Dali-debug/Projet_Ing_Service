import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  updateScheduleItem(scheduleId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/schedule/${scheduleId}`, data);
  }

  deleteScheduleItem(scheduleId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/schedule/${scheduleId}`);
  }
}
