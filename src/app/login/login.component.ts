import { ChangeDetectionStrategy, Component , ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { catchError, map, of } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../store/actions/auth.actions';
import { AuthState } from '../store/reducers/auth.reducer';

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
    private store: Store<{ auth: AuthState }>,
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












//   onSubmit(form: NgForm) {
//     if (form.valid) {
//       const { email, password } = form.value;
  
//       this.dataService.getUserData().subscribe(users => {
//         console.log("Users",users);
//         const user = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
//         console.log("User",user);

//         if (user) {
//           console.log('Login successful!');
//           this.store.dispatch(loginSuccess({ email: user.email, role: user.role }));
//           this.toastr.success('Login successful!');
//           this.router.navigate([this.getDashboardRoute(user.role)]);
          

//         } else {
//           console.error('Invalid email or password!');
//         }
//       });
//     }
//   }
//    private getDashboardRoute(role: string): string {
//   switch (role) {
//     case 'student': return '/user-dashboard';
//     case 'teacher': return '/faculty-dashboard';
//     case 'admin': return '/admin-dashboard';
//     default: return '/';
//   }
// }
  // onSubmit(form: NgForm) {
  //   if (form.valid) {
  //     const { email, password } = form.value;

  //     this.dataService.getUserData().pipe(
  //       map(users => {
  //         return users.find(
  //           user => user.email.toLowerCase()  === email.toLowerCase()  && user.password === password
  //         );
  //       }),
  //       catchError(error => {
  //         console.error('Error during login process:', error);
  //         return of(null);
  //       })
  //     ).subscribe(user => {
  //       if (user) {
  //         // console.log(user);
  //         console.log('Login successful!');
  //         // alert('Login successful!');
         
  //           this.toastr.success('Login Successful!');

  //         this.authService.login(email);
  //         console.log(user.role);

  //         if (user.role === 'student') {
  //           this.router.navigate(['/user-dashboard']);
  //           // this.router.navigate(['/user-dashboard']).then(() => {
            
  //           //   location.href = '/user-dashboard';

  //           // });
  //         } else if (user.role === 'teacher') {
  //           // this.router.navigate(['/faculty-dashboard']).then(() => {
  //           //   location.href = '/faculty-dashboard';
  //           // });
  //           this.router.navigate(['/faculty-dashboard']);
  //           // location.reload();
  //           // this.router.navigate(['/faculty-dashboard'], { queryParams: { reload: true } });

  //         }
  //         else if (user.role === 'admin') {
  //           this.router.navigate(['/admin-dashboard']);
           
  //           // this.router.navigate(['/admin-dashboard']).then(() => {
  //           //   location.href = '/admin-dashboard';
  //           // });
  //         }
  //       } else
  //        {
  //            this.toastr.error('Invalid email or password!', 'Oops!');

  //         console.error('Invalid email or password!');

  //       }
  //     });
  //   } else {
  //     this.toastr.error('Form is invalid!', 'Oops!');
  //     console.error('Form is invalid!');
  //   }
  // }












// import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';
// import { DataService } from '../data.service';
// import { catchError, map, of } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: false,
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class LoginComponent {
//   backgroundImage: string = 'assets/images/Img3.png';
//   hide = true;

//   constructor(
//     private dataService: DataService,
//     private authService: AuthService,
//     private router: Router
//   ) {}
 

//   onSubmit(form: NgForm) {
//     if (form.valid) {
//       const { email, password } = form.value;

//       this.dataService.getUserData().pipe(
//         map(users => {
//           return users.find(
//             user => user.email === email && user.password === password
//           );
//         }),
//         catchError(error => {
//           console.error('Error during login process:', error);
//           return of(null);
//         })
//       ).subscribe(user => {
//         if (user) {
//           console.log('Login successful!');
//           alert('Login successful!');

//           this.authService.login();

          
//         // this.authService.login(email);

//           if (user.role === 'student') {
//             this.router.navigate(['/user-dashboard']);
//           } else if (user.role === 'teacher') {
//             this.router.navigate(['/faculty-dashboard']);
//           }
//         } else {
//           alert('Invalid email or password!');
//           console.error('Invalid email or password!');
//         }
//       });
//     } else {
//       console.error('Form is invalid!');
//     }
//   }

// }
















// ///*********Required
// import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';
// import { DataService } from '../data.service';
// import { catchError, map, of } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: false,
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class LoginComponent {
//   backgroundImage: string = 'assets/images/Img3.png';
//   hide = true;

//   constructor(
//     private dataService: DataService,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   onSubmit(form: NgForm) {
//     if (form.valid) {
//       const { email, password } = form.value;

//       this.dataService.getUserData().pipe(
//         map(users => {
//           return users.some(
//             user => user.email === email && user.password === password
//           );
//         }),
//         catchError(error => {
//           console.error('Error during login process:', error);
//           return of(false);
//         })
//       ).subscribe(isUserValid => {
//         if (isUserValid) {
//           console.log('Login successful!');
//           alert('Login successful!');

  
//           this.authService.login();
//           this.router.navigate(['/user-dashboard']);
//         } else {
//           alert('Invalid email or password!');
//           console.error('Invalid email or password!');
//         }
//       });
//     } else {
//       console.error('Form is invalid!');
//     }
//   }
// }


























// import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { DataService } from '../data.service';
// import { catchError, map, of } from 'rxjs';

// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';




// @Component({
//   selector: 'app-login',
//   standalone: false,

//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
//   changeDetection: ChangeDetectionStrategy.OnPush,

// })
// export class LoginComponent {

//   backgroundImage: string = 'assets/images/Img3.png';
//   hide = true;


//   constructor(private dataService: DataService,   private authService: AuthService,
//     private router: Router) { }

//   onSubmit(form: NgForm) {
//     if (form.valid) {
//       const { email, password } = form.value;

//       this.dataService.getUserData().pipe(
//         map(users => {
//           return users.some(
//             user => user.email === email && user.password === password
//           );
//         }),
//         catchError(error => {
//           console.error('Error during login process:', error);
//           return of(false);
//         })
//       ).subscribe(isUserValid => {
//         if (isUserValid) {
//           console.log('Login successful!');
//           alert('Login successful!');
//           this.authService.login();
//           this.router.navigate(['/dashboard']);
//         } else {
//           console.error('Invalid email or password!');
//         }
//       });
//     } else {
//       console.error('Form is invalid!');
//     }
//   }
// }


// hide = signal(true);
// clickEvent(event: MouseEvent) {
//   this.hide.set(!this.hide());
//   event.stopPropagation();
// }