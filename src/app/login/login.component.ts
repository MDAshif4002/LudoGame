// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [RouterLink, CommonModule, FormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   constructor(private http: HttpClient, private router: Router) {}

//   regmodel = {
//     mobile: ""
//   };

//   submitform(): void {
//     if (!this.regmodel.mobile) {
//       Swal.fire("Please enter a valid mobile number.");
//       return;
//     }
  
//     let formdata = new FormData();
//     formdata.append("mobile", this.regmodel.mobile);
  
//     const apiurl = "http://localhost:43039/api/LudoKingAPI/login";
  
//     this.http.post(apiurl, formdata).subscribe({
//       next: (response: any) => {
//         let userId = response?.data?.id;
//         if (userId.status === "Success") {
//           Swal.fire(`OTP Sent: ${response.data.otp}`);
//           console.log("✅ User ID received:", userId);
//          localStorage.setItem("userId", userId.toString());
//             this.router.navigate(["/verifynumber",userId]);
//         } else {
//           Swal.fire("Invalid Mobile Number. Please try again.");
//         }
//       },
//       error: (err) => {
//         if (err.status === 404) {
//           Swal.fire("Mobile Number Not Found.");
//         } else {
//           Swal.fire("API Call Failed. Please check the server.");
//         }
//       }
//     });
//   }
  
// }



// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [RouterLink, CommonModule, FormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   constructor(private http: HttpClient, private router: Router) {}

//   regmodel = {
//     mobile: "",
//     otp: ""
//   };

//   submitform(): void {
//     if (!this.regmodel.mobile) {
//       Swal.fire("Please enter a valid mobile number.");
//       return;
//     }

//     let formdata = new FormData();
//     formdata.append("mobile", this.regmodel.mobile);

//     const apiurl = "http://localhost:43039/api/LudoKingAPI/login";

//     this.http.post(apiurl, formdata).subscribe({
//       next: (response: any) => {
//         console.log("✅ API Response:", response);

//         // ✅ Fetch user ID from response.data.id
//         let userId = response?.data?.id;

//         if (userId) {
//           console.log("✅ User ID received:", userId);
//           localStorage.setItem("userId", userId.toString());
//           this.router.navigate(["/verifyotp", userId]); // ✅ Navigate to profile with ID
//         } else {
//           console.error("❌ Login failed, ID not received.");
//           Swal.fire("Login failed! No ID received.");
//         }
//       },
//       error: (err) => {
//         console.error("❌ API Error:", err);
//         if (err.status === 404) {
//           Swal.fire("Mobile Number Not Found.");
//         } else {
//           Swal.fire("API Call Failed. Please check the server.");
//         }
//       }
//     });
//   }
// }



//3rd line


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
        console.log("✅ API Response:", response);

        // ✅ Check if API status is "Success"
        if (response.status === "Success" && response.data) {
          let userId = response.data.id;
          let otp = response.data.otp;
          
          if (userId) {
            console.log("✅ User ID received:", userId);
            localStorage.setItem("userId", userId.toString());
            
            // ✅ OTP show karein aur verification page pr bhejein
            Swal.fire(`OTP Sent: ${otp}`).then(() => {
              this.router.navigate(["/verifynumber", userId]); 
            });
          } else {
            console.error("❌ User ID is missing in response.");
            Swal.fire("Login failed! User ID is missing.");
          }
        } else {
          console.warn("❌ Invalid Mobile Number. Please try again.");
          Swal.fire("Invalid Mobile Number. Please try again.");
        }
      },
      error: (err) => {
        console.error("❌ API Error:", err);
        if (err.status === 404) {
          Swal.fire("Mobile Number Not Found.");
        } else {
          Swal.fire("API Call Failed. Please check the server.");
        }
      }
    });
  }
}
