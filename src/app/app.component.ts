import { CommonModule } from '@angular/common';
import { Component, DoCheck  } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor() {}


  title = 'LudoKing';

  userlogin: boolean = false;

  ngOnInit(): void {

    var mobile = localStorage.getItem("userlogin");
    console.log('Mobile = '+mobile);

    if(mobile!=null)
    {
      this.userlogin = true;
    }

  }

  ngDoCheck(): void {
    
    var mobile = localStorage.getItem("userlogin");
    console.log('Mobile = '+mobile);

    if(mobile!=null)
    {
      this.userlogin = true;
    }

  }

}
