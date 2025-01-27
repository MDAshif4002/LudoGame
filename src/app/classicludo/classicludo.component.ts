import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-classicludo',
  standalone:true,
  imports: [RouterLink,CommonModule],
  templateUrl: './classicludo.component.html',
  styleUrl: './classicludo.component.css'
})
export class ClassicludoComponent {

}
