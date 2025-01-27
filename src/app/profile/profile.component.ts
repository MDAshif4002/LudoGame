import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const avatarContainer: HTMLElement | null = this.el.nativeElement.querySelector("#avtar-container");

    if (avatarContainer) {
      this.renderer.listen(avatarContainer, "click", (event: Event) => {
        const target = event.target as HTMLElement;

        // Ensure target is an <img> element
        if (target instanceof HTMLImageElement) {
          // Remove 'avtar-active' class from all images
          const images: NodeListOf<HTMLImageElement> = avatarContainer.querySelectorAll("img");
          images.forEach(img => this.renderer.removeClass(img, "avtar-active"));

          // Add 'avtar-active' class to the clicked image
          this.renderer.addClass(target, "avtar-active");

          console.log("Class added to:", target.src);
        }
      });
    }
  }
}
