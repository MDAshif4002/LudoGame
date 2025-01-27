import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ludoplayer',
  standalone:true,
  imports: [RouterLink,CommonModule],
  templateUrl: './ludoplayer.component.html',
  styleUrl: './ludoplayer.component.css'
})
export class LudoplayerComponent {
  
}
