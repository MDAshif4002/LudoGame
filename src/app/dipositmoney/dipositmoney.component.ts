import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dipositmoney',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './dipositmoney.component.html',
  styleUrls: ['./dipositmoney.component.css'],
})
export class DipositmoneyComponent {
  amount: number = 0;
  upiId: string = '8875956425@okbizaxis';

  // Fix: Ensure correct type safety for input event
  setAmount(value: number | Event) {
    if (typeof value === 'number') {
      this.amount = value; // Button click case
    } 
    else {
      const inputElement = value.target as HTMLInputElement;
      this.amount = Number(inputElement.value) || 0; // Input field case
    }
  }
  

  copyUPIID() {
    navigator.clipboard.writeText(this.upiId)
      .then(() => console.log('UPI ID copied to clipboard'))
      .catch(err => console.error('Failed to copy UPI ID', err));
  }
}
