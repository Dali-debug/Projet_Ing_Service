import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AppNotification } from '../models';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getNotifications(userId: string): Observable<AppNotification[]> {
    return this.http.get<any>(`${this.apiUrl}/notifications/${userId}`).pipe(
      map(response => {
        const notifs = response.notifications || response || [];
        return notifs.map((n: any) => ({
          id: n.id?.toString() || '',
          userId: n.user_id || n.userId || '',
          message: n.message || '',
          type: n.type || 'info',
          isRead: n.is_read || n.isRead || false,
          createdAt: n.created_at || n.createdAt || ''
        }));
      })
    );
  }

  getUnreadCount(userId: string): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/notifications/${userId}/unread-count`).pipe(
      map(response => response.count || response.unreadCount || 0)
    );
  }

  markAsRead(notificationId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/notifications/${notificationId}/read`, {});
  }

  markAllAsRead(userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/notifications/${userId}/read-all`, {});
  }

  deleteNotification(notificationId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/notifications/${notificationId}`);
  }
}
