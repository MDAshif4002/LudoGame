import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-legalterm',
  standalone:true,
  imports: [RouterLink,CommonModule],
  templateUrl: './legalterm.component.html',
  styleUrl: './legalterm.component.css'
})
export class LegaltermComponent {

}
