import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { response } from 'express';
import Swal from 'sweetalert2';

interface Slider{
  id:number;
  pic:string;
  link:string;
}

interface Users{
  id:number;
}
@Component({
  selector: 'app-userhome',
  imports: [CommonModule,RouterLink],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css'
})
export class UserhomeComponent implements OnInit{

data : Slider[]=[];

baseurl = "http://localhost:43039/slider/";

constructor(private http:HttpClient, private router:Router, private activeroute:ActivatedRoute){}
id:string | null = null;
ngOnInit():void{

  this.id= this.activeroute.snapshot.paramMap.get("id");
      console.log("🌐 URL se ID mili:", this.id); // Debugging  
    
      if (!this.id) {
        console.warn("⚠️ ID URL me nahi mili, localStorage check kar rahe hain...");
        this.id = localStorage.getItem("userId");
      }
    
      console.log("📌 Final ID jo API ke liye use hogi:", this.id); // Debugging  
    
      if (!this.id) {
        console.error("❌ User ID is missing!");
        Swal.fire("User ID is missing! Cannot update profile.");
        return;
      }
      const apiurl1 = `http://localhost:43039/api/LudoKingAPI/registrationshow/${this.id}`;
      this.http.get<Users>(apiurl1).subscribe({
            next: (response) => {
              console.log("success");
            },
            error: (err) => {
              console.error("❌ API Call Failed", err);
            }
          });

  const apiurl = "http://localhost:43039/api/LudoKingAPI/showslider";

  this.http.get<Slider[]>(apiurl).subscribe({
    next:(response)=>{
      this.data = response;
    },
    error:(err)=>{
      Swal.fire("API Call Failed");
    }
  });
}
editAvatar(id:number):void{
  this.router.navigate(["/profile",id]);
}
}
