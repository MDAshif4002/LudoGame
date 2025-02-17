import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-support',
  standalone:true,
  imports: [CommonModule,RouterLink],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {

}
