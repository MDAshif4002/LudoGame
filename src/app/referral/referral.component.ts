import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-referral',
  standalone:true,
  imports: [RouterLink,CommonModule],
  templateUrl: './referral.component.html',
  styleUrl: './referral.component.css'
})
export class ReferralComponent {

}
