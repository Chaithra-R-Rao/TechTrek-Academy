import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  logo: string = "assets/images/Logo.png";
  userRole: string | null = null;

  constructor(
    public authService: AuthService,
    private dataService: DataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setUserRole();
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
      this.cdr.detectChanges();  });
  }

  setUserRole() {
    if (this.authService.isAuthenticated()) {
      const storedRole = localStorage.getItem('userRole');
      if (storedRole) {
        this.userRole = storedRole;
      } else {
        const userEmail = this.authService.getCurrentUserEmail();
        if (userEmail) {
          this.dataService.getUserByEmail(userEmail).subscribe(user => {
            if (user[0]) {
              this.userRole = user[0].role;
              if (this.userRole) {
                localStorage.setItem('userRole', this.userRole); // ✅ Store role only if it's not null
              }
              this.cdr.detectChanges();
            }
          });
        }
      }
    }
  }

  logout() {
    this.authService.logout();
    this.userRole = null;
    this.router.navigate(['/login']);
    this.cdr.detectChanges();
  }
}






