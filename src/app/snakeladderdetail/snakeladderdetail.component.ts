import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-snakeladderdetail',
  standalone:true,
  imports: [RouterLink,CommonModule],
  templateUrl: './snakeladderdetail.component.html',
  styleUrl: './snakeladderdetail.component.css'
})
export class SnakeladderdetailComponent {

}
