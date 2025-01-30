import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  logo: string = "assets/images/Logo.png";

  // constructor(public authService: AuthService, private router: Router) {}

  // logout() {
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }

  userRole: string | null = null;

  constructor(
    public authService: AuthService,
    private dataService: DataService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const userEmail = this.authService.getCurrentUserEmail();
      if (userEmail) {
        this.dataService.getUserByEmail(userEmail).subscribe(user => {
          const user1 = user[0];
          console.log(user1);
          if (user1) {
            this.userRole = user1.role;

          }

        });
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
