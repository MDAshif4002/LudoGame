import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { response } from 'express';
import Swal from 'sweetalert2';

interface Slider{
  id:number;
  pic:string;
  link:string;
}
@Component({
  selector: 'app-userhome',
  imports: [RouterLink,CommonModule],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.css'
})
export class UserhomeComponent implements OnInit{

data : Slider[]=[];

baseurl = "http://localhost:43039/slider/";

constructor(private http:HttpClient, private router:Router){}

ngOnInit():void{
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
}
