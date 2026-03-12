import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NurseryService } from '../../services/nursery.service';

@Component({
  selector: 'app-nursery-children-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nursery-children-list.component.html',
  styleUrl: './nursery-children-list.component.scss'
})
export class NurseryChildrenListComponent implements OnInit {
  enrolledChildren: any[] = [];
  isLoading = true;

  constructor(private authService: AuthService, private nurseryService: NurseryService) {}

  ngOnInit() {
    const user = this.authService.currentUser;
    if (user) {
      this.nurseryService.getNurseriesByOwner(user.id).subscribe({
        next: (nurseries) => {
          if (nurseries.length > 0) {
            this.nurseryService.getEnrolledChildren(nurseries[0].id).subscribe({
              next: (response) => {
                // Backend returns { parents: [{ parentName, parentPhone, children: [...] }] }
                if (response.parents && Array.isArray(response.parents)) {
                  this.enrolledChildren = response.parents.flatMap((p: any) =>
                    (p.children || []).map((c: any) => ({
                      ...c,
                      parentName: c.parentName || p.parentName || 'N/A',
                      parentPhone: c.parentPhone || p.parentPhone || ''
                    }))
                  );
                } else {
                  this.enrolledChildren = response.children || response.enrolledChildren || [];
                }
                this.isLoading = false;
              },
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
