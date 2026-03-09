import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Enrollment } from '../models';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createEnrollment(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/enrollments`, data);
  }

  getEnrollmentsByParent(parentId: string): Observable<Enrollment[]> {
    return this.http.get<any>(`${this.apiUrl}/enrollments/parent/${parentId}`).pipe(
      map(response => {
        const enrollments = response.enrollments || response || [];
        return enrollments.map((e: any) => this.mapEnrollment(e));
      })
    );
  }

  getEnrollmentsByNursery(nurseryId: string): Observable<Enrollment[]> {
    return this.http.get<any>(`${this.apiUrl}/enrollments/nursery/${nurseryId}`).pipe(
      map(response => {
        const enrollments = response.enrollments || response || [];
        return enrollments.map((e: any) => this.mapEnrollment(e));
      })
    );
  }

  acceptEnrollment(enrollmentId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/enrollments/${enrollmentId}/accept`, {});
  }

  rejectEnrollment(enrollmentId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/enrollments/${enrollmentId}/reject`, {});
  }

  private mapEnrollment(e: any): Enrollment {
    return {
      id: e.id?.toString() || '',
      childName: e.child_name || e.childName || '',
      childAge: parseInt(e.child_age || e.childAge) || 0,
      parentName: e.parent_name || e.parentName || '',
      parentPhone: e.parent_phone || e.parentPhone || '',
      nurseryId: e.nursery_id || e.nurseryId || '',
      nurseryName: e.nursery_name || e.nurseryName || '',
      startDate: e.start_date || e.startDate || '',
      endDate: e.end_date || e.endDate || '',
      status: e.status || 'pending',
      medicalNotes: e.medical_notes || e.medicalNotes || '',
      dietaryRestrictions: e.dietary_restrictions || e.dietaryRestrictions || '',
      notes: e.notes || '',
      createdAt: e.created_at || e.createdAt || ''
    };
  }
}
