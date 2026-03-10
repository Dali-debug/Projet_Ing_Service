import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConversationService } from '../../services/conversation.service';
import { Message } from '../../models';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  messages: Message[] = [];
  newMessage = '';
  conversationId = '';
  isLoading = true;
  private refreshInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private conversationService: ConversationService
  ) {}

  ngOnInit() {
    this.conversationId = this.route.snapshot.paramMap.get('conversationId') || '';
    if (this.conversationId) {
      this.loadMessages();
      this.refreshInterval = setInterval(() => this.loadMessages(), 5000);
    }
  }

  ngOnDestroy() {
    if (this.refreshInterval) clearInterval(this.refreshInterval);
  }

  loadMessages() {
    this.conversationService.getMessages(this.conversationId).subscribe({
      next: (messages) => {
        this.messages = messages;
        this.isLoading = false;
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: () => this.isLoading = false
    });

    const user = this.authService.currentUser;
    if (user) {
      this.conversationService.markAsRead(this.conversationId, user.id).subscribe();
    }
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    const user = this.authService.currentUser;
    if (!user) return;

    this.conversationService.sendMessage(this.conversationId, user.id, this.newMessage).subscribe({
      next: () => {
        this.newMessage = '';
        this.loadMessages();
      },
      error: () => {}
    });
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }

  isMyMessage(message: Message): boolean {
    return message.senderId === this.authService.currentUser?.id;
  }

  goBack() { this.router.navigate(['/chat']); }
}
