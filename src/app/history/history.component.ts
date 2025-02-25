import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  currentDateTime: string = "";
  userId: string = "";

  constructor() {
    this.loadOrGenerateUserId();
    this.loadOrSetDateTime();
  }

  loadOrGenerateUserId() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = storedUserId;
    } else {
      this.userId = this.generateUserId();
      localStorage.setItem('userId', this.userId);
    }
  }

  generateUserId(): string {
    return 'USER-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  loadOrSetDateTime() {
    const storedDateTime = localStorage.getItem(`fixedDateTime_${this.userId}`);

    if (storedDateTime) {
      this.currentDateTime = storedDateTime;
    } else {
      const now = new Date().toLocaleString();
      this.currentDateTime = now;
      localStorage.setItem(`fixedDateTime_${this.userId}`, now);
    }
  }
}
