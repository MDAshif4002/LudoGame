import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import Swal from 'sweetalert2';

interface Users{
  id:number;
  roomcode:string;
  amount:string;
  name:string;
}
@Component({
  selector: 'app-snakeladderdetail',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './snakeladderdetail.component.html',
  styleUrl: './snakeladderdetail.component.css'
})
export class SnakeladderdetailComponent {
  data : Users[] = [];
  constructor(private http:HttpClient, private router:Router, private activeroute:ActivatedRoute){}
  id:string | null = null;
  amount:string | null = null;
  name:string|null=null;

  regmodel = {
    id:"",
    roomcode:"",
    userresult:"",
    resultscreenshot:"",
    amount:""
  }

  ngOnInit():void{
    this.amount = localStorage.getItem("userAmount");
    
    console.log("🌐 URL se ID mili:", this.id); // Debugging  
    
      if (!this.id) {
        console.warn("⚠️ ID URL me nahi mili, localStorage check kar rahe hain...");
        this.id = localStorage.getItem("userId");
      }
    
      console.log("📌 Final ID jo API ke liye use hogi:", this.id); // Debugging 
      this.getUserName(); 
      
      const apiurl = `http://localhost:43039/api/LudoKingAPI/gameshow/${this.id}`;
      
      this.http.get<Users>(apiurl).subscribe({
        next:(response)=>{
          this.regmodel.roomcode = response.roomcode;
          this.regmodel.amount = response.amount;
        },
        error:(err)=>{
          Swal.fire("Error","Please send your roomcode","error");
        }
      });
    }

    gameroomcode():void{
      let formdata = new FormData();
      formdata.append("id",this.id?this.id:"");
      formdata.append("roomcode",this.regmodel.roomcode);

      const apiurl = "http://localhost:43039/api/LudoKingAPI/gameroomcode";
      this.http.put(apiurl,formdata).subscribe({
        next:(response)=>{
          Swal.fire("Success","Roomcode is successfully sent","success").then(()=>{
            this.router.navigate(["/snakeladderdetail"])
          });
        },
        error:(err)=>{
          Swal.fire("Error","Please send your roomcode","error")
        }
      });
    }

    myfile:File|null = null;
    getmyfile(event:Event):void{
      const input = event.target as HTMLInputElement;
      if(input.files && input.files.length>0)
      {
        this.myfile = input.files[0];
      }
    }

    resultupdate():void{
      let formdata = new FormData();
      formdata.append("id",this.id?this.id:"");
      formdata.append("userresult",this.regmodel.userresult);
      if(this.myfile)
      {
        formdata.append("resultscreenshot",this.myfile);
      }

      const apiurl = "http://localhost:43039/api/LudoKingAPI/gameresultupdate";
      this.http.put(apiurl,formdata).subscribe({
        next:(response)=>{
          Swal.fire("Success","User result is updated","success").then(()=>{
            this.router.navigate(["/snakeladderdetail"]);
          });
        },
        error:(err)=>{
          Swal.fire("Error","Please enter a valid result","error");
        }
      });
    }

    getUserName():void{
      if(!this.id)
      {
        console.warn("User ID is null, skipping getUserName()");
        return;
      }

      const apiurl = `http://localhost:43039/api/LudoKingAPI/registrationshow/${this.id}`;

      this.http.get<Users>(apiurl).subscribe({
        next:(response)=>{
          this.name = response.name;
          //userid generate start
        const userName = response?.name ?? 'guest'; 
        const userid = userName.toString().toLowerCase().trim().replace(/\s+/g, '').slice(0,8)+"..."; 

        let userKey = `randomNumber_${this.id}`;
          let savedRandomNumber = localStorage.getItem(userKey);

          if (!savedRandomNumber) {
            savedRandomNumber = Math.floor(1000 + Math.random() * 9000).toString();
            localStorage.setItem(userKey, savedRandomNumber);
          }

          this.name = `@${userid}`;
         //userid generate end

        },
      });
    }
}
