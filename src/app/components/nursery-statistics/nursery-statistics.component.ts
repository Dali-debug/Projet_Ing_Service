import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NurseryService } from '../../services/nursery.service';

@Component({
  selector: 'app-nursery-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nursery-statistics.component.html',
  styleUrl: './nursery-statistics.component.scss'
})
export class NurseryStatisticsComponent implements OnInit {
  stats: any = {};
  isLoading = true;

  constructor(private authService: AuthService, private nurseryService: NurseryService) {}

  ngOnInit() {
    const user = this.authService.currentUser;
    if (user) {
      this.nurseryService.getNurseriesByOwner(user.id).subscribe({
        next: (nurseries) => {
          if (nurseries.length > 0) {
            this.nurseryService.getNurseryStats(nurseries[0].id).subscribe({
              next: (stats) => { this.stats = stats.statistics || stats || {}; this.isLoading = false; },
              error: () => this.isLoading = false
            });
          } else {
            this.isLoading = false;
          }
        },
        error: () => this.isLoading = false
      });
    }
  }
}
