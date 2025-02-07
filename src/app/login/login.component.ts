import { ChangeDetectionStrategy, Component , ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { catchError, map, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginComponent {
  backgroundImage: string = 'assets/images/login-bg.png';
  hide = true;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef   
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { email, password } = form.value;
  
      this.dataService.getUserData().pipe(
        map(users => users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password)),
        catchError(error => {
          console.error('Error during login process:', error);
          return of(null);
        })
      ).subscribe(user => {
        if (user) {
          this.toastr.success('Login Successful!');
          this.authService.login(email, user.role); // Store user role
          this.authService.login(email, user.role);
          this.authService.setUserRole(user.role);
          this.cdr.detectChanges(); // Manually trigger change detection
          this.router.navigate([this.getDashboardRoute(user.role)]);
        } else {
          this.toastr.error('Invalid email or password!', 'Oops!');
        }
      });
    }
  }
  
  getDashboardRoute(role: string): string {
    switch (role) {
      case 'student': return '/user-dashboard';
      case 'teacher': return '/faculty-dashboard';
      case 'admin': return '/admin-dashboard';
      default: return '/login';
    }
  }
} 

















