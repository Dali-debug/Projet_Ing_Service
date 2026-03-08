import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Child } from '../models';

@Injectable({ providedIn: 'root' })
export class ChildService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getChildrenByParent(parentId: string): Observable<Child[]> {
    return this.http.get<any>(`${this.apiUrl}/parents/${parentId}/children`).pipe(
      map(response => {
        const children = response.children || response || [];
        return children.map((c: any) => ({
          id: c.id?.toString() || '',
          name: c.name || '',
          age: parseInt(c.age) || 0,
          photo: c.photo || '',
          nurseryId: c.nursery_id || c.nurseryId || ''
        }));
      })
    );
  }
}
