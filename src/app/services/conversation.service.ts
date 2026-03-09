import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Conversation, Message } from '../models';

@Injectable({ providedIn: 'root' })
export class ConversationService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getOrCreateConversation(parentId: string, nurseryOwnerId: string, nurseryId: string): Observable<Conversation> {
    return this.http.post<any>(`${this.apiUrl}/conversations/get-or-create`, {
      parentId, directeurId: nurseryOwnerId, garderieId: nurseryId
    }).pipe(map(r => this.mapConversation(r.conversation || r)));
  }

  getConversations(userId: string): Observable<Conversation[]> {
    return this.http.get<any>(`${this.apiUrl}/conversations/user/${userId}`).pipe(
      map(response => {
        const conversations = response.conversations || response || [];
        return conversations.map((c: any) => this.mapConversation(c));
      })
    );
  }

  getMessages(conversationId: string): Observable<Message[]> {
    return this.http.get<any>(`${this.apiUrl}/conversations/${conversationId}/messages`).pipe(
      map(response => {
        const messages = response.messages || response || [];
        return messages.map((m: any) => this.mapMessage(m));
      })
    );
  }

  sendMessage(conversationId: string, senderId: string, content: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/conversations/${conversationId}/messages`, {
      expediteurId: senderId, contenu: content
    });
  }

  markAsRead(conversationId: string, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/conversations/${conversationId}/mark-read`, { userId });
  }

  private mapConversation(c: any): Conversation {
    return {
      id: c.id?.toString() || '',
      parentId: c.parent_id || c.parentId || '',
      directeurId: c.directeur_id || c.directeurId || '',
      garderieId: c.garderie_id || c.garderieId || '',
      messages: (c.messages || []).map((m: any) => this.mapMessage(m)),
      derniereMiseAJour: c.derniere_mise_a_jour || c.derniereMiseAJour || new Date().toISOString(),
      messagesNonLus: parseInt(c.messages_non_lus || c.messagesNonLus) || 0,
      dernierMessage: c.dernier_message ? this.mapMessage(c.dernier_message) : undefined,
      otherUserName: c.other_user_name || c.otherUserName || '',
      nurseryName: c.nursery_name || c.nurseryName || ''
    };
  }

  private mapMessage(m: any): Message {
    return {
      id: m.id?.toString() || '',
      expediteurId: m.expediteur_id || m.expediteurId || '',
      destinataireId: m.destinataire_id || m.destinataireId || '',
      contenu: m.contenu || m.content || '',
      dateEnvoi: m.date_envoi || m.dateEnvoi || new Date().toISOString(),
      estLu: m.est_lu || m.estLu || false
    };
  }
}
