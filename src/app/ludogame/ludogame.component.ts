
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ludogame',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './ludogame.component.html',
  styleUrls: ['./ludogame.component.css']
})
export class LudogameComponent implements OnInit {
  players!: number;  // Add the non-null assertion operator (!)

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Capture the 'players' parameter from the route
    this.route.paramMap.subscribe(params => {
      // Parse the value to a number
      this.players = +params.get('players')!;
      // Print the value to the console
      console.log(`Players: ${this.players}`);
    });
  }
}
