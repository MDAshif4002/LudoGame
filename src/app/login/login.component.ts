import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router) {}

  regmodel = {
    mobile: ""
  };

  submitform(): void {
    if (!this.regmodel.mobile) {
      Swal.fire("Please enter a valid mobile number.");
      return;
    }
  
    let formdata = new FormData();
    formdata.append("mobile", this.regmodel.mobile);
  
    const apiurl = "http://localhost:43039/api/LudoKingAPI/login";
  
    this.http.post(apiurl, formdata).subscribe({
      next: (response: any) => {
        if (response.status === "Success") {
          Swal.fire(`OTP Sent: ${response.data.otp}`).then(() => {
            this.router.navigate(["/verifynumber"]);
          });
        } else {
          Swal.fire("Invalid Mobile Number. Please try again.");
        }
      },
      error: (err) => {
        if (err.status === 404) {
          Swal.fire("Mobile Number Not Found.");
        } else {
          Swal.fire("API Call Failed. Please check the server.");
        }
      }
    });
  }
  
}
