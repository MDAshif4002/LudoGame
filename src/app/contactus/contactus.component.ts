import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { response} from 'express';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  imports: [FormsModule,CommonModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
 constructor(private http:HttpClient, private router:Router){}

 regmodel={
  name:"",
  email:"",
  mobile:"",
  message:""
 }

 submitform():void{
  let formdata = new FormData;
  formdata.append("name",this.regmodel.name);
  formdata.append("email",this.regmodel.email);
  formdata.append("mobile",this.regmodel.mobile);
  formdata.append("message",this.regmodel.message);

  const apiurl = "http://localhost:43039/api/LudoKingAPI/addcontact";

  this.http.post(apiurl,formdata).subscribe({
    next:(response)=>{
      Swal.fire("Successfully submit your enquiry").then(()=>{
        this.router.navigate(["/home"]);
      });
    },
    error:(err)=>{
      Swal.fire("API Call Failed");
    }
  });
 }
}
