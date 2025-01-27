import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-paymentgateway',
  standalone:true,
  imports: [RouterLink,CommonModule],
  templateUrl: './paymentgateway.component.html',
  styleUrl: './paymentgateway.component.css'
})
export class PaymentgatewayComponent {

}
