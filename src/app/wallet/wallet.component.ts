import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wallet',
  imports: [RouterLink],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {

}



// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-wallet',
//   imports:[FormsModule],
//   templateUrl: './wallet.component.html',
//   styleUrls: ['./wallet.component.css']
// })
// export class WalletComponent {
//   amount: number = 0;

//   constructor(private http: HttpClient, private router: Router) { }

//   // Step 1: On form submit, create the order for payment
//   onSubmit() {
//     if (this.amount <= 0) {
//       alert("Please enter a valid amount.");
//       return;
//     }

//     // Step 2: API Call to Create a Wallet Deposit Order
//     this.http.get<{ orderId: string, keyId: string }>(`http://localhost:43039/api/LudoKingAPI/addwallet?amount=${this.amount}`)
//       .subscribe(response => {
//         const { orderId, keyId } = response;

//         // Step 3: Configure Razorpay Payment Options
//         const options: any = {
//           key: keyId,  // Razorpay API Key
//           amount: this.amount * 100,  // Amount in paise
//           currency: "INR",
//           name: "LudoKing",  // Your company name
//           description: "Deposit for Ludo Game",
//           image: "https://yourwebsite.com/logo.png",  // Your logo
//           order_id: orderId,  // Razorpay order ID
//           handler: (response: any) => {
//             // Payment success handler
//             alert("Payment successful!");
//             console.log(response);  // Log the payment response

//             // Step 4: After payment success, update wallet in database
//             this.updateWalletStatus(response);
//           },
//           prefill: {
//             name: "Customer Name",  // Use customer details dynamically
//             email: "customer@example.com",
//             contact: "1234567890"
//           },
//           theme: {
//             color: "#3399cc"
//           }
//         };

//         var Razorpay:any;
//         // Step 5: Check if Razorpay is available and open the payment gateway
//         if (typeof Razorpay !== 'undefined') {
//           const paymentGateway = new Razorpay(options);
//           paymentGateway.open();

//           // Handle payment failure
//           paymentGateway.on('payment.failed', function (response: any) {
//             alert("Payment failed!");
//             console.log(response);
//           });
//         } else {
//           alert("Razorpay SDK is not loaded. Please try again later.");
//         }
//       });
//   }

//   // Step 6: API to update wallet details in the database after payment success
//   updateWalletStatus(paymentResponse: any) {
//     const walletData = {
//       amount: this.amount,
//       transactionId: paymentResponse.razorpay_payment_id,  // Get payment ID from Razorpay response
//       status: "Successful"
//     };

//     // Step 7: Make API call to save wallet status after successful payment
//     this.http.post("http://localhost:43039/api/LudoKingAPI/addwallet", walletData)
//       .subscribe(response => {
//         console.log("Wallet updated:", response);
//         // Redirect user to wallet page
//         this.router.navigate(['/wallet']);
//       }, error => {
//         console.error("Error updating wallet:", error);
//       });
//   }
// }
