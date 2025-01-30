import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  url1: string =
  "assets/images/Img1.png";
  url2: string =
  "assets/images/Img2.png";
  url3: string =
 "assets/images/Img3.png";
 logo: string = "assets/images/Logo.png";

}
