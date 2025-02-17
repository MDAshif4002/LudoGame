import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { response } from 'express';

interface Users{
  id:number;
  otp:string;
}
@Component({
  selector: 'app-verifynumber',
  standalone:true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './verifynumber.component.html',
  styleUrl: './verifynumber.component.css'
})
export class VerifynumberComponent {

  constructor( private route: Router, private http:HttpClient, private activeRoute:ActivatedRoute ) {}

  loginbtn()
  {

    localStorage.setItem("userlogin", "9988776655");

    this.route.navigate(['userhome']);

  }

  regmodel = {
    otp : "",
    otpstatus : "",
    datetime : ""
  }

  id:string | null = null;

  ngOnInit() : void{
    this.id = this.activeRoute.snapshot.paramMap.get("id");

    const apiurl = "http://localhost:43039/api/LudoKingAPI/registrationshow/"+this.id;
    this.http.get<Users>(apiurl).subscribe({
      next:(response)=>{
        this.regmodel.otp=response.otp;
        Swal.fire("OTP Verified Successfully")
      },
      error:(err)=>{
        // Swal.fire("API Called Failed");
      }
    });
  }

  editform() : void{
    let formdata = new FormData;
    formdata.append("id",this.id?this.id:"");
    formdata.append("otp",this.regmodel.otp);
    formdata.append("otpstatus",this.regmodel.otpstatus);
    formdata.append("datetime",this.regmodel.datetime);

    const apiurl = "http://localhost:43039/api/LudoKingAPI/registrationupdate";

    this.http.put(apiurl,formdata).subscribe({
      next:(response)=>{
        Swal.fire("Data Updated Successfully").then(()=>{
          this.route.navigate(["/userhome"]);
        });
      },
      error:(err)=>{
        Swal.fire("API Called Failed");
      }
    });
  }

}
