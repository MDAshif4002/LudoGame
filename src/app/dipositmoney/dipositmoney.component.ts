import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {loadStripe} from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { SignupComponent } from '../signup/signup.component';
import { response } from 'express';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dipositmoney',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './dipositmoney.component.html',
  styleUrls: ['./dipositmoney.component.css'],
})
export class DipositmoneyComponent {

  constructor(private router:Router,private http:HttpClient){}

  amt: number = 0;
  upiId: string = '8875956425@okbizaxis';

  regmodel={
    type:"Credit",
    remark:"",
    amount:"",
    userid:0,
    status:"",
    txnid:"",
    paymentrefno:""

  }

  //Fix: Ensure correct type safety for input event
  setAmount(value: number | Event) {
    if (typeof value === 'number') {
      this.amt = value; // Button click case
    } 
    else {
      const inputElement = value.target as HTMLInputElement;
      this.amt = Number(inputElement.value) || 0; // Input field case
    }
    //this.router.navigate(['/paymentgateway']);
  }
  

  copyUPIID() {
    navigator.clipboard.writeText(this.upiId)
      .then(() => console.log('UPI ID copied to clipboard'))
      .catch(err => console.error('Failed to copy UPI ID', err));
  }

  submitform():void{
    let formdata = new FormData();
    formdata.append("amount",this.regmodel.amount);

    const apiurl = "http://localhost:43039/api/LudoKingAPI/addwallet";

    this.http.post(apiurl, formdata).subscribe({
      next:(response)=>{
        Swal.fire("Payment Successfull").then(()=>{
          this.router.navigate(["/paymentgateway"]);
        });
      },
      error:(err)=>{
        Swal.fire("API Call Failed");
      }
    });
  }
  }