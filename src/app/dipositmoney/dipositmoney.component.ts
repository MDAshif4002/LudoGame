import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dipositmoney',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dipositmoney.component.html',
  styleUrls: ['./dipositmoney.component.css'],
})
export class DipositmoneyComponent {
  constructor(private router: Router, private http: HttpClient) {}

  upiId: string = '8875956425@okbizaxis';

  regmodel = {
    type: '',
    remark: '',
    amount: '',
    userid: '',
    status: '',
    txnid: '',
    paymentrefno: ''
  };

  
  setAmount(value: number | Event) {
    if (typeof value === 'number') {
      this.regmodel.amount = value.toString();
    } else {
      const inputElement = value.target as HTMLInputElement;
      this.regmodel.amount = inputElement.value;
    }
  }

  copyUPIID() {
    navigator.clipboard.writeText(this.upiId)
      .then(() => console.log('UPI ID copied to clipboard'))
      .catch(err => console.error('Failed to copy UPI ID', err));
  }

  submitform(): void {
    if (!this.regmodel.amount || Number(this.regmodel.amount) <= 0) {
      Swal.fire('Please enter a valid amount');
      return;
    }

    let formdata = new FormData();
    formdata.append('amount', this.regmodel.amount);

    const apiurl = 'http://localhost:43039/api/LudoKingAPI/addwallet';

    this.http.post(apiurl, formdata).subscribe({
      next: () => {
        
          this.router.navigate(['/paymentgateway']);
        
      },
      error: () => {
        Swal.fire('API Call Failed');
      }
    });
  }
}
