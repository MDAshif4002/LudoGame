// import { CommonModule } from '@angular/common';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// import { response } from 'express';
// import Swal from 'sweetalert2';

// interface User {
//   id: number;
//   amount: string;
//   name:string;
// }

// @Component({
//   selector: 'app-snake-and-ladder',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
//   templateUrl: './snake-and-ladder.component.html',
//   styleUrls: ['./snake-and-ladder.component.css']
// })
// export class SnakeAndLadderComponent implements OnInit {
//   userData: User | null = null;
//   userId: string | null = null;
//   id:string|null=null;
//   amount: string = ""; 
//   name:string|null = null;
  
//   data : User[]=[];
//   constructor(private http: HttpClient, private router: Router, private activeroute: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.userId = localStorage.getItem("userId");

//     if (!this.userId) {
//       Swal.fire("Error", "User ID not found", "error");
//       return;
//     }

//     console.log("Final ID:", this.userId);
//     this.getUserData();
//     this.user();
//   }

//   getUserData(): void {
//     const apiUrl = `http://localhost:43039/api/LudoKingAPI/gameshow/${this.userId}`;

//     this.http.get<User>(apiUrl).subscribe({
//       next: (response) => {
//         this.userData = response;
//         //this.amount = response.amount;
//         this.name = response.name;
//       },
//       error: () => {
//         Swal.fire("Error", "API Call Failed", "error");
//       }
//     });
//   }

//   user():void{
//     const apiurl = `http://localhost:43039/api/LudoKingAPI/registrationshow/${this.id}`;
//     this.http.get<User>(apiurl).subscribe({
//       next:(response)=>{
//         this.name= response.name;
//       }
//     });
//   }

//   setAmount(): void {
//     if (!this.userId || !this.amount) {
//       Swal.fire("Error", "Invalid input", "error");
//       return;
//     }

//     let formData = new FormData();
//     formData.append("id", this.userId);
//     formData.append("amount", this.amount);

//     const apiUrl = "http://localhost:43039/api/LudoKingAPI/setamount";

//     this.http.put(apiUrl, formData).subscribe({
//       next: () => {
//         Swal.fire("Success", "Your amount is successfully set", "success").then(() => {
//           this.getUserData(); // ✅ API se latest data fetch karega
//           localStorage.setItem("userAmount", this.amount); 
//         });
//       },
//       error: () => {
//         Swal.fire("Error", "Your amount is not successfully set", "error");
//       }
//     });
//   }
// }




import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

interface User {
  id: number;
  amount: string;
  name: string;
}

@Component({
  selector: 'app-snake-and-ladder',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './snake-and-ladder.component.html',
  styleUrls: ['./snake-and-ladder.component.css']
})
export class SnakeAndLadderComponent implements OnInit {
  userData: User | null = null;
  userId: string | null = null;
  amount: string = ""; 
  name: string | null = null;
  
  constructor(private http: HttpClient, private router: Router, private activeroute: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");

    if (!this.userId) {
      Swal.fire("Error", "User ID not found", "error");
      return;
    }

    console.log("Final ID:", this.userId);
    this.getUserData();
    this.getUserName();
  }

  getUserData(): void {
    const apiUrl = `http://localhost:43039/api/LudoKingAPI/gameshow/${this.userId}`;

    this.http.get<User>(apiUrl).subscribe({
      next: (response) => {
        this.userData = response;
        this.name = response.name;
      },
      error: (err) => {
        console.error("Error fetching game data:", err);
        Swal.fire("Error", "API Call Failed", "error");
      }
    });
  }

  getUserName(): void {
    if (!this.userId) {
      console.warn("User ID is null, skipping getUserName()");
      return;
    }

    const apiUrl = `http://localhost:43039/api/LudoKingAPI/registrationshow/${this.userId}`;

    this.http.get<User>(apiUrl).subscribe({
      next: (response) => {
        this.name = response.name;

        
        //userid generate start
        const userName = response?.name ?? 'guest'; 
        const userid = userName.toString().toLowerCase().trim().replace(/\s+/g, '').slice(0,8)+"..."; 

        let userKey = `randomNumber_${this.userId}`;
          let savedRandomNumber = localStorage.getItem(userKey);

          if (!savedRandomNumber) {
            savedRandomNumber = Math.floor(1000 + Math.random() * 9000).toString();
            localStorage.setItem(userKey, savedRandomNumber);
          }

          this.name = `@${userid}`;
         //userid generate end

      },
      error: (err) => {
        console.error("Error fetching user name:", err);
      }
    });
  }

  setAmount(): void {
    if (!this.userId || !this.amount.trim()) {
      Swal.fire("Error", "Invalid input", "error");
      return;
    }

    let formData = new FormData();
    formData.append("id", this.userId);
    formData.append("amount", this.amount);

    const apiUrl = "http://localhost:43039/api/LudoKingAPI/setamount";

    this.http.put(apiUrl, formData).subscribe({
      next: () => {
        Swal.fire("Success", "Your amount is successfully set", "success").then(() => {
          this.getUserData();
          localStorage.setItem("userAmount", this.amount); 
        });
      },
      error: (err) => {
        console.error("Error setting amount:", err);
        Swal.fire("Error", "Your amount is not successfully set", "error");
      }
    });
  }
}
