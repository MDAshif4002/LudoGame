import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verifynumber',
  standalone:true,
  imports: [RouterLink,CommonModule],
  templateUrl: './verifynumber.component.html',
  styleUrl: './verifynumber.component.css'
})
export class VerifynumberComponent {

}
