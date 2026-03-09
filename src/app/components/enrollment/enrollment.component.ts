import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NurseryService } from '../../services/nursery.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Nursery } from '../../models';

@Component({
  selector: 'app-enrollment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.scss'
})
export class EnrollmentComponent implements OnInit {
  nursery: Nursery | null = null;
  currentStep = 1;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  // Step 1: Child info
  childName = '';
  childAge = '';

  // Step 2: Parent info
  parentName = '';
  parentPhone = '';
  medicalNotes = '';
  dietaryRestrictions = '';

  // Step 3: Enrollment details
  startDate = '';
  notes = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private authService: AuthService,
    private nurseryService: NurseryService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit() {
    const nurseryId = this.route.snapshot.paramMap.get('nurseryId');
    if (nurseryId) {
      this.nurseryService.getNurseryById(nurseryId).subscribe({
        next: (nursery) => this.nursery = nursery,
        error: () => {}
      });
    }

    const user = this.authService.currentUser;
    if (user) {
      this.parentName = user.name;
      this.parentPhone = user.phone || '';
    }
  }

  nextStep() {
    if (this.currentStep === 1 && (!this.childName || !this.childAge)) {
      this.errorMessage = 'Veuillez remplir les informations de l\'enfant';
      return;
    }
    if (this.currentStep === 2 && !this.parentName) {
      this.errorMessage = 'Veuillez remplir votre nom';
      return;
    }
    this.errorMessage = '';
    this.currentStep++;
  }

  prevStep() {
    this.errorMessage = '';
    this.currentStep--;
  }

  submitEnrollment() {
    const user = this.authService.currentUser;
    if (!user || !this.nursery) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    this.enrollmentService.createEnrollment({
      child_name: this.childName,
      child_age: parseInt(this.childAge),
      parent_id: user.id,
      parent_name: this.parentName,
      parent_phone: this.parentPhone,
      nursery_id: this.nursery.id,
      start_date: this.startDate || new Date().toISOString().split('T')[0],
      medical_notes: this.medicalNotes,
      dietary_restrictions: this.dietaryRestrictions,
      notes: this.notes
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = 'Inscription envoyée avec succès !';
        setTimeout(() => this.router.navigate(['/parent/enrollments']), 2000);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Erreur lors de l\'inscription';
      }
    });
  }
}
