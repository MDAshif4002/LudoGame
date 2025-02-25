// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { response } from 'express';
// import Swal from 'sweetalert2';


// @Component({
//   selector: 'app-withdraw',
//   standalone:true,
//   imports: [CommonModule,FormsModule],
//   templateUrl: './withdraw.component.html',
//   styleUrl: './withdraw.component.css'
// })
// export class WithdrawComponent {
// constructor(private http:HttpClient, private router:Router){}

// regmodel = {
//   bank:"",
//   accountholder:"",
//   ifsccode:"",
//   accountnumber:"",
//   amount:"",
//   screenshot:""
// }
// submitform():void{
//   let formdata = new FormData();
//   formdata.append("bank",this.regmodel.bank);
//   formdata.append("accountholder",this.regmodel.accountholder);
//   formdata.append("ifsccode",this.regmodel.ifsccode);
//   formdata.append("accountnumber",this.regmodel.accountnumber);
//   formdata.append("amount",this.regmodel.amount);

//   const apiurl = "http://localhost:43039/api/LudoKingAPI/addwithdraw";

//   this.http.post(apiurl,formdata).subscribe({
//     next:(response)=>{
//       Swal.fire("Withdraw Successfully").then(()=>{
//         this.router.navigate(["/withdrawscreenshot",]);
//       });
//     },
//     error:(err)=>{
//       Swal.fire("API Call Failed");
//     }
//   });
// }
// }





import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-withdraw',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css'
})
export class WithdrawComponent {
constructor(private http:HttpClient, private router:Router){}

regmodel = {
  bank:"",
  accountholder:"",
  ifsccode:"",
  accountnumber:"",
  amount:"",
  screenshot:""
}
submitform():void{
  let formdata = new FormData();
  formdata.append("bank",this.regmodel.bank);
  formdata.append("accountholder",this.regmodel.accountholder);
  formdata.append("ifsccode",this.regmodel.ifsccode);
  formdata.append("accountnumber",this.regmodel.accountnumber);
  formdata.append("amount",this.regmodel.amount);

  const apiurl = "http://localhost:43039/api/LudoKingAPI/addwithdraw";

  this.http.post(apiurl,formdata).subscribe({
    next:(response)=>{
      Swal.fire("Success","Withdraw Successfully","success").then(()=>{
        this.router.navigate(["/withdrawscreenshot"]);
      });
    },
    error:(err)=>{
      Swal.fire("Error","API Call Failed","error");
    }
  });
}
}





