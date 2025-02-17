import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-signup',
  imports: [RouterLink,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private http:HttpClient, private router:Router){}

  regmodel = {
    name:"",
    email:"",
    mobile:"",
  }

  submitform(): void{
    let formdata = new FormData();
    formdata.append("name",this.regmodel.name);
    formdata.append("email",this.regmodel.email);
    formdata.append("mobile",this.regmodel.mobile);


    const apiurl = "http://localhost:43039/api/LudoKingAPI/registration";

    this.http.post(apiurl,formdata).subscribe({
      next:(response)=>{
        alert("User Successfully Registered")
      },
      error:(err)=>{
        alert("API Called Failed")
      }
    });
  }

}
