// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { response } from 'express';
// import Swal from 'sweetalert2';

// interface Users{
//   id:number;
//   screenshot:string;
// }
// @Component({
//   selector: 'app-withdrawscreenshot',
//   imports: [CommonModule,FormsModule],
//   templateUrl: './withdrawscreenshot.component.html',
//   styleUrl: './withdrawscreenshot.component.css'
// })
// export class WithdrawscreenshotComponent {
//   constructor(private http:HttpClient, private router:Router, private activeroute:ActivatedRoute){}

//   regmodel = {
//     screenshot:""
//   }

//   id : string | null = null;

//   ngOnInit():void{
//     this.id = this.activeroute.snapshot.paramMap.get("id");

//     const apiurl = "http://localhost:43039/api/LudoKingAPI/showwithdraw/"+this.id;
//     this.http.get<Users>(apiurl).subscribe({
//       next:(response)=>{
//         this.regmodel.screenshot = response.screenshot;
//       },
//       error:(err)=>{

//       }
//     });
//   }

//   myfile:File | null = null;
//   getmyfile(event:Event):void{
//     const input = event.target as HTMLInputElement;
//     if(input.files && input.files.length>0)
//     {
//       this.myfile = input.files[0]
//     }
//   }

//   editform():void{
//     let formdata = new FormData();
//     if(this.myfile)
//     {
//       formdata.append("screenshot",this.regmodel.screenshot);
//     }

//     const apiurl = "http://localhost:43039/api/LudoKingAPI/updatewithdrawimg";

//     this.http.put(apiurl,formdata).subscribe({
//       next:(response)=>{
//         Swal.fire("Upload Screenshot").then(()=>{
//           this.router.navigate(["/userhome"]);
//         });
//       },
//       error:(err)=>{
//         Swal.fire("API Call Failed");
//       }
//     });
//   }
// }




import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Users {
  id: number;
  screenshot: string;
}

@Component({
  selector: 'app-withdrawscreenshot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './withdrawscreenshot.component.html',
  styleUrls: ['./withdrawscreenshot.component.css']
})
export class WithdrawscreenshotComponent {
  constructor(private http: HttpClient, private router: Router, private activeroute: ActivatedRoute) {}

  regmodel = { screenshot: '' };
  id: string | null = null;
  myfile: File | null = null;

  ngOnInit(): void {
    this.id = this.activeroute.snapshot.paramMap.get('id') || localStorage.getItem('userId');

    if (!this.id) {
      Swal.fire('Error', 'User ID not found. Redirecting to home.', 'error').then(() => {
        this.router.navigate(['/userhome']);
      });
      return;
    }

    const apiurl = `http://localhost:43039/api/LudoKingAPI/showwithdraw/${this.id}`;
    this.http.get<Users>(apiurl).subscribe({
      next: (response) => {
        this.regmodel.screenshot = response.screenshot;
      },
      error: (err) => {
        console.error('Error fetching screenshot:', err);
      }
    });
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.myfile = input.files[0];
    }
  }

  editform(): void {
    if (!this.id) {
      Swal.fire('Error', 'Invalid User ID', 'error');
      return;
    }

    if (!this.myfile) {
      Swal.fire('Error', 'Please select a file to upload', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('id', this.id);
    formData.append('screenshot', this.myfile);

    const apiurl = 'http://localhost:43039/api/LudoKingAPI/updatewithdrawimg';

    this.http.put(apiurl, formData).subscribe({
      next: (response) => {
        Swal.fire('Success', 'Screenshot uploaded successfully.', 'success').then(() => {
          this.router.navigate(['/userhome']);
        });
      },
      error: (err) => {
        console.error('Upload error:', err);
        Swal.fire("Error", "API Call Failed", "error");
      }
    });
  }
}
