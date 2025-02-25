import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-referral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.css']
})
export class ReferralComponent {
  referralCode: string = '';
  userId: string = '';

  constructor() {
    this.loadUserId();
    this.loadOrGenerateReferralCode();
  }

  loadUserId() {
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

  loadOrGenerateReferralCode() {
    const referralKey = `referralCode_${this.userId}`;
    const storedCode = localStorage.getItem(referralKey);

    if (storedCode) {
      this.referralCode = storedCode;
    } else {
      this.referralCode = this.generateRandomCode();
      localStorage.setItem(referralKey, this.referralCode);
    }
  }

  generateRandomCode(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    let numPart = '';
    let letterPart = '';

    for (let i = 0; i < 5; i++) {
      numPart += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    for (let i = 0; i < 3; i++) {
      letterPart += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    return this.shuffleString(numPart + letterPart);
  }

  shuffleString(input: string): string {
    return input.split('').sort(() => Math.random() - 0.5).join('');
  }

  async copyToClipboard() {
    await navigator.clipboard.writeText(this.referralCode);

    
    Swal.fire({
      title: 'Copied!',
      html: `Referral Code <b>"${this.referralCode}"</b> copied successfully.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  shareOnWhatsApp() {
    const message = `Hey! Use my referral code *${this.referralCode}* to get amazing rewards!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

}
