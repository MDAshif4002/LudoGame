import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

interface Users {
  id: number;
  photo: string;
  name:string;
  mobile:string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data : Users[] = [];

  avatarUrl: string = 'avatar16.png'; // Default avatar
  avatars: string[] = [
    'avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png', 'avatar5.png',
    'avatar6.png', 'avatar7.png', 'avatar8.png', 'avatar9.png', 'avatar10.png',
    'avatar11.png', 'avatar12.png', 'avatar13.png', 'avatar14.png', 'avatar15.png',
    'avatar16.png', 'avatar17.png', 'avatar18.png', 'avatar19.png', 'avatar20.png'
  ];

  regmodel = {
    id: "",
    photo: "",
    name:"",
    mobile:""
  };


  id: string | null = null;
  name:string = "guest1234";
  username:string|null=null;
  mobile: string | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private http: HttpClient,
    private activeroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // ✅ Retrieve ID from URL or LocalStorage
    this.id = this.activeroute.snapshot.paramMap.get("id") || localStorage.getItem("userId");

    if (!this.id) {
      Swal.fire("Error", "User ID not found! Redirecting to home...", "error").then(() => {
        this.router.navigate(["/home"]);
      });
      return;
    }

    console.log("✅ Fetching data for ID:", this.id);


    const storedUsername = localStorage.getItem("name");
    this.name = storedUsername ? `@${storedUsername}` : "@Guest"; 

    // ✅ API Call to Fetch User Data
    const apiurl = `http://localhost:43039/api/LudoKingAPI/registrationshow/${this.id}`;

    this.http.get<Users>(apiurl).subscribe({
      next: (response) => {
        this.regmodel.photo = response.photo;
        this.avatarUrl = response.photo ? response.photo : this.avatarUrl;
        this.regmodel.name = response.name;
        this.mobile = response.mobile;
        console.log("✅ User Data Fetched Successfully:", response);

        //userid generate start
        const userName = response?.name ?? 'guest'; 
        const userid = userName.toString().toLowerCase().trim().replace(/\s+/g, ''); 

        let userKey = `randomNumber_${this.id}`;
          let savedRandomNumber = localStorage.getItem(userKey);

          if (!savedRandomNumber) {
            savedRandomNumber = Math.floor(1000 + Math.random() * 9000).toString();
            localStorage.setItem(userKey, savedRandomNumber);
          }

          this.name = `@${userid}${savedRandomNumber}`;
         //userid generate end

  
      },
      error: (err) => {
        Swal.fire("Error", "Failed to load user data!", "error");
        console.error("❌ API Fetch Error:", err);
      }
    });

    // ✅ Avatar selection logic
    const avatarContainer: HTMLElement | null = this.el.nativeElement.querySelector("#avatar-container");

    if (avatarContainer) {
      this.renderer.listen(avatarContainer, "click", (event: Event) => {
        const target = event.target as HTMLElement;
        if (target instanceof HTMLImageElement) {
          this.changeAvatar(target.src);
        }
      });
    }
  }

  /** ✅ Change Avatar and Update in Database */
  changeAvatar(newAvatar: string): void {
    if (!this.id) {
      Swal.fire("Error", "Invalid User ID", "error");
      return;
    }

    this.avatarUrl = newAvatar;
    localStorage.setItem('selectedAvatar', newAvatar);

    let formdata = new FormData();
    formdata.append("id", this.id);
    formdata.append("photo", newAvatar); // ✅ Sending avatar image name to backend

    const apiurl = "http://localhost:43039/api/LudoKingAPI/setimg";
    
    this.http.put(apiurl, formdata).subscribe({
      next: (response) => {
        console.log("✅ Avatar Updated in Database:", response);
        Swal.fire("Success", "Your avatar has been updated!", "success");
      },
      error: (err) => {
        Swal.fire("Error", "Failed to update avatar!", "error");
        console.error("❌ Avatar Update Error:", err);
      }
    });
  }
  

  updateform():void{
    let formdata = new FormData();
    formdata.append("id",this.id?this.id:"");
    formdata.append("name",this.regmodel.name);

    const apiurl ="http://localhost:43039/api/LudoKingAPI/updateuser";

    this.http.put(apiurl,formdata).subscribe({
      next:(response)=>{
        Swal.fire("Update Your Username...").then(()=>{
          this.router.navigate(["/profile"]);
        });
      },
      error:(err)=>{
        Swal.fire("API Call Failed");
      }
    });
  }

  logout(): void {
    localStorage.removeItem("userlogin");
    this.router.navigate(["/home"]);
  }
}
