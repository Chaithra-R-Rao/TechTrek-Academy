// import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent  implements OnInit {

  video1: string = "assets/videos/LVC.mp4";

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.initIntersectionObserver();
  }

  initIntersectionObserver(): void {
    const aboutSection = this.el.nativeElement.querySelector('#aboutSection');
    const videoElement: HTMLVideoElement = this.el.nativeElement.querySelector('#aboutVideo');

        // Ensure the video is always muted
        videoElement.muted = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const content = this.el.nativeElement.querySelector('.content');
            this.renderer.addClass(content, 'animate');
            observer.unobserve(aboutSection);
            videoElement.play(); // Play the video when the section comes into view
          } else {
            videoElement.pause(); // Pause the video when the section is out of view
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
    );

    observer.observe(aboutSection);
  }
}
