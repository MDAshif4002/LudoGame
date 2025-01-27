import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-snake-and-ladder',
  standalone:true,
  imports: [RouterLink,CommonModule],
  templateUrl: './snake-and-ladder.component.html',
  styleUrl: './snake-and-ladder.component.css'
})
export class SnakeAndLadderComponent {

}
