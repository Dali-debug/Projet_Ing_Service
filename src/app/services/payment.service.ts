import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Payment, FinancialStats } from '../models';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getPaymentStatus(parentId: string): Observable<Payment[]> {
    return this.http.get<any>(`${this.apiUrl}/payments/parent/${parentId}/status`).pipe(
      map(response => response.pendingPayments || response.payments || response || [])
    );
  }

  processPayment(data: { paymentId: string; cardNumber: string; expiryDate: string; cvv: string; cardholderName: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payments/process`, {
      paymentId: data.paymentId,
      cardNumber: data.cardNumber,
      expiryDate: data.expiryDate,
      cvv: data.cvv,
      cardholderName: data.cardholderName
    });
  }

  getPaymentHistory(parentId: string): Observable<Payment[]> {
    return this.http.get<any>(`${this.apiUrl}/payments/parent/${parentId}/history`).pipe(
      map(response => response.payments || response || [])
    );
  }

  getNurseryPayments(nurseryId: string): Observable<Payment[]> {
    return this.http.get<any>(`${this.apiUrl}/payments/nursery/${nurseryId}`).pipe(
      map(response => response.payments || response || [])
    );
  }

  getOwnerPayments(ownerId: string): Observable<Payment[]> {
    return this.http.get<any>(`${this.apiUrl}/payments/owner/${ownerId}`).pipe(
      map(response => response.payments || response || [])
    );
  }

  getNurseryFinancialStats(nurseryId: string): Observable<FinancialStats> {
    return this.http.get<any>(`${this.apiUrl}/payments/nursery/${nurseryId}/stats`).pipe(
      map(response => response.stats || response || {})
    );
  }

  getOwnerFinancialStats(ownerId: string): Observable<FinancialStats> {
    return this.http.get<any>(`${this.apiUrl}/payments/owner/${ownerId}/stats`).pipe(
      map(response => response.stats || response || {})
    );
  }

  syncPayments(parentId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payments/sync`, { parentId });
  }

  formatAmount(amount: number): string {
    return amount.toFixed(2) + ' DT';
  }

  validateCardNumber(cardNumber: string): boolean {
    const cleaned = cardNumber.replace(/\s/g, '');
    return /^\d{16}$/.test(cleaned);
  }

  validateExpiryDate(expiryDate: string): boolean {
    return /^\d{2}\/\d{2}$/.test(expiryDate);
  }

  validateCVV(cvv: string): boolean {
    return /^\d{3,4}$/.test(cvv);
  }
}
