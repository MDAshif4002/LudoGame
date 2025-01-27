import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-classicludodetail',
  standalone:true,
  imports: [RouterLink,CommonModule],
  templateUrl: './classicludodetail.component.html',
  styleUrl: './classicludodetail.component.css'
})
export class ClassicludodetailComponent {

}
