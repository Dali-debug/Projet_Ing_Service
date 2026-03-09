import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NurseryService } from '../../services/nursery.service';
import { AuthService } from '../../services/auth.service';
import { Nursery, Review } from '../../models';

@Component({
  selector: 'app-nursery-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nursery-details.component.html',
  styleUrl: './nursery-details.component.scss'
})
export class NurseryDetailsComponent implements OnInit {
  nursery: Nursery | null = null;
  reviews: Review[] = [];
  isLoading = true;
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private nurseryService: NurseryService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadNursery(id);
    }
  }

  loadNursery(id: string) {
    this.isLoading = true;
    this.nurseryService.getNurseryById(id).subscribe({
      next: (nursery) => {
        this.nursery = nursery;
        this.loadReviews(id);
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  loadReviews(nurseryId: string) {
    this.nurseryService.getNurseryReviews(nurseryId).subscribe({
      next: (reviews) => this.reviews = reviews,
      error: () => {}
    });
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  enrollChild() {
    if (this.nursery) {
      this.router.navigate(['/enrollment', this.nursery.id]);
    }
  }

  contactNursery() {
    this.router.navigate(['/chat']);
  }

  goBack() {
    this.router.navigate(['/search']);
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }
}
