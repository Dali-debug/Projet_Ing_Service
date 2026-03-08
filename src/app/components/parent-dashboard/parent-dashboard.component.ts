import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ParentService } from '../../services/parent.service';
import { ChildService } from '../../services/child.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-parent-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parent-dashboard.component.html',
  styleUrl: './parent-dashboard.component.scss'
})
export class ParentDashboardComponent implements OnInit {
  userName = '';
  children: any[] = [];
  enrolledNurseries: any[] = [];
  todayProgram: any[] = [];
  recentReviews: any[] = [];
  unreadNotifications = 0;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private parentService: ParentService,
    private childService: ChildService,
    private enrollmentService: EnrollmentService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.currentUser;
    if (!user) return;
    this.userName = user.name;
    this.loadDashboardData(user.id);
  }

  loadDashboardData(userId: string) {
    this.isLoading = true;

    this.childService.getChildrenByParent(userId).subscribe({
      next: (children) => this.children = children,
      error: () => {}
    });

    this.parentService.getParentNurseries(userId).subscribe({
      next: (nurseries) => this.enrolledNurseries = nurseries,
      error: () => {}
    });

    this.parentService.getTodayProgram(userId).subscribe({
      next: (programs) => this.todayProgram = Array.isArray(programs) ? programs : [],
      error: () => {}
    });

    this.parentService.getNurseryRecentReviews(userId).subscribe({
      next: (reviews) => this.recentReviews = Array.isArray(reviews) ? reviews : [],
      error: () => {}
    });

    this.notificationService.getUnreadCount(userId).subscribe({
      next: (count) => this.unreadNotifications = count,
      error: () => {}
    });

    setTimeout(() => this.isLoading = false, 1000);
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }

  navigateToSearch() { this.router.navigate(['/search']); }
  navigateToChildren() { this.router.navigate(['/parent/children']); }
  navigateToEnrollments() { this.router.navigate(['/parent/enrollments']); }
  navigateToPayments() { this.router.navigate(['/parent/payments']); }
  navigateToReviews() { this.router.navigate(['/parent/reviews']); }
  navigateToNotifications() { this.router.navigate(['/notifications']); }
  navigateToChat() { this.router.navigate(['/chat']); }
  viewNurseryDetails(nurseryId: string) { this.router.navigate(['/nursery/details', nurseryId]); }
}
