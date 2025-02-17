import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { response } from 'express';

interface Users{
  id:number;
  photo:string;
}
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  avatarUrl: string = 'avatar16.png'; // Default avatar
  avatars: string[] = [
    'avatar1.png',
    'avatar2.png',
    'avatar3.png',
    'avatar4.png', 
    'avatar5.png',
    'avatar6.png', 
    'avatar7.png', 
    'avatar8.png', 
    'avatar9.png', 
    'avatar10.png',
    'avatar11.png', 
    'avatar12.png', 
    'avatar13.png', 
    'avatar14.png', 
    'avatar15.png',
    'avatar16.png', 
    'avatar17.png', 
    'avatar18.png', 
    'avatar19.png', 
    'avatar20.png'
  ];

  constructor(private el: ElementRef, private renderer: Renderer2, private route: Router, private router: Router, private http: HttpClient,private activeroute:ActivatedRoute) {}

  regmodel = {
    id:"",
    photo : ""
  };
   id:string | null = null;

  ngOnInit(): void {
    // Check if an avatar is saved in localStorage
    const savedAvatar = localStorage.getItem('selectedAvatar');
    if (savedAvatar) {
      this.avatarUrl = savedAvatar;
    }

    const avatarContainer: HTMLElement | null = this.el.nativeElement.querySelector("#avtar-container");

    if (avatarContainer) {
      this.renderer.listen(avatarContainer, "click", (event: Event) => {
        const target = event.target as HTMLElement;

        // Ensure target is an <img> element
        if (target instanceof HTMLImageElement) {
          // Remove 'avtar-active' class from all images
          const images: NodeListOf<HTMLImageElement> = avatarContainer.querySelectorAll("img");
          images.forEach(img => this.renderer.removeClass(img, "avtar-active"));

          // Add 'avtar-active' class to the clicked image
          this.renderer.addClass(target, "avtar-active");

          // Save the selected avatar to localStorage
          this.avatarUrl = target.src;
          localStorage.setItem('selectedAvatar', target.src);

          console.log("Class added to:", target.src);
        }
      });
    }

    this.id = this.activeroute.snapshot.paramMap.get("id");

    const apiurl = "http://localhost:43039/api/LudoKingAPI/registrationshow/"+this.id;

    this.http.get<Users>(apiurl).subscribe({
      next:(response)=>{
        this.regmodel.photo = response.photo;
      },
      error:(err)=>{

      }
    });
  }

  
  myfile: File | null = null;

  getmyfile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.myfile = input.files[0];
    }
  }

  editAvatar():void{
    let formdata = new FormData();
    console.log("id",this.id);
    console.log("MyFile",this.myfile);
    
    formdata.append("id",this.id?this.id:"");
    if(this.myfile)
    {
      formdata.append("photo",this.myfile);
    }  
    const apiurl = "http://localhost:43039/api/LudoKingAPI/setimg";
    this.http.put(apiurl,formdata).subscribe({
      next:(response)=>{
        console.log("dyfvhcj",response);
        Swal.fire("Updated Your Profile Image").then(()=>{
          this.router.navigate(["/userhome"]);
        });
      },
      error:(err)=>{
        Swal.fire("API Called Failed");    
        console.log(err)
      }
    });
    
  }


  logout() {
    localStorage.removeItem("userlogin");
    this.route.navigate(["/home"]);
  }

  setAvatar(newAvatar: string) {
    this.avatarUrl = newAvatar;
    // Save selected avatar to localStorage
    localStorage.setItem('selectedAvatar', newAvatar);
  }


}


