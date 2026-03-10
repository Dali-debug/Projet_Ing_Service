import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ChildService } from '../../services/child.service';

@Component({
  selector: 'app-parent-children',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parent-children.component.html',
  styleUrl: './parent-children.component.scss'
})
export class ParentChildrenComponent implements OnInit {
  children: any[] = [];
  isLoading = true;

  constructor(private authService: AuthService, private childService: ChildService) {}

  ngOnInit() {
    const user = this.authService.currentUser;
    if (user) {
      this.childService.getChildrenByParent(user.id).subscribe({
        next: (children) => { this.children = children; this.isLoading = false; },
        error: () => this.isLoading = false
      });
    }
  }
}
