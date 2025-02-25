import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { response } from 'express';
import Swal from 'sweetalert2';

interface User {
  id: number;
  amount: string;
  name:string;
}

@Component({
  selector: 'app-classicludo',
  standalone:true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './classicludo.component.html',
  styleUrl: './classicludo.component.css'
})
export class ClassicludoComponent {
  id:string | null = null;
userData: User | null = null; 
  userId: string | null = null;
  amount: string = ""; 
  name: string |null = null;

  constructor(private http:HttpClient, private router:Router, private activeroute:ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
    this.id=localStorage.getItem("id");

    if (!this.userId) {
      Swal.fire("Error", "User ID not found", "error");
      return;
    }

    console.log("Final ID:", this.userId);
    this.getUserData();
    this.getUserName();
  }

  // ✅ User ka data fetch karega
  getUserData(): void {
    const apiUrl = `http://localhost:43039/api/LudoKingAPI/gameshow/${this.userId}`;

    this.http.get<User>(apiUrl).subscribe({
      next: (response) => {
        this.userData = response;
        //this.amount = response.amount; 
      },
      error: () => {
        Swal.fire("Error", "API Call Failed", "error");
      }
    });
  }

  
  setAmount(): void {
    if (!this.userId || !this.amount) {
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
      error: () => {
        Swal.fire("Error", "Your amount is not successfully set", "error");
      }
    });
  }
  getUserName():void{
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
}
