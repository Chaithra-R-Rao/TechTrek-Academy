import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-change-password',
  standalone: false,

  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  token: string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private toastr: ToastrService,
  ) {
    this.changePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    if (!this.token) {
      console.error('No reset token provided.');
      this.router.navigate(['/forgot-password']);
    }
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) return;

    const { newPassword, confirmPassword } = this.changePasswordForm.value;

    if (newPassword !== confirmPassword) {
      // alert('Passwords do not match!');
      this.toastr.warning('Passwords do not match!');

      return;
    }

    this.verifyTokenAndResetPassword(this.token, newPassword).subscribe({
      next: () => {
        this.toastr.success('Password changed successfully!');
        // alert('Password changed successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error:', err);
        // alert('Invalid or expired reset link.');
        this.toastr.warning('Invalid or expired reset link.');

      }
    });
  }

  private verifyTokenAndResetPassword(token: string, newPassword: string): Observable<any> {
    // return this.http.get<any[]>(`http://localhost:3000/user-data?resetToken=${token}`)
    return this.http.get<any[]>(`http://localhost:3000/user-data?resetToken_like=${token}`).
      pipe(
        switchMap(users => {
          if (users.length === 0) return throwError(() => new Error('Invalid token'));


          const user = users.find(u => u.resetToken === token); // Ensure correct user
          if (!user) {
            return throwError(() => new Error('No user found with this token'));
          }
          // const user = users[0];
          console.log(user);
          if (new Date(user.resetTokenExpiry) < new Date()) {
            return throwError(() => new Error('Token expired'));
          }
          console.log("User id", user.id, "password", newPassword);
          return this.http.patch<any>(`http://localhost:3000/user-data/${user.id}`, {
            password: newPassword,
            resetToken: null,
            resetTokenExpiry: null
          });
        })
      );
  }




  // ngOnInit(): void {
  //   this.store.select((state) => state.forgotPassword.email)
  //     .pipe(take(1))
  //     .subscribe((email) => {
  //       if (email) {
  //         this.email = email;
  //         localStorage.setItem('resetEmail', email); // ✅ Store in localStorage
  //       } else {
  //         const storedEmail = localStorage.getItem('resetEmail');
  //         if (storedEmail) {
  //           this.email = storedEmail; // ✅ Use stored email if available
  //         } else {
  //           console.log("No email found, redirecting...");
  //           this.router.navigate(['/forgot-password']);
  //         }
  //       }
  //     });
  // }

  // onSubmit() {
  //   if (this.changePasswordForm.invalid) {
  //     return;
  //   }

  //   const { newPassword, confirmPassword } = this.changePasswordForm.value;

  //   if (newPassword !== confirmPassword) {
  //     alert('Passwords do not match!');
  //     return;
  //   }

  //   console.log(this.email);

  //   // Call backend API to update password
  //   this.dataService.changePassword(this.email, newPassword).subscribe({
  //     next: () => {
  //       alert('Password changed successfully!');
  //       this.router.navigate(['/login']);
  //     },
  //     error: (err) => {
  //       console.error('Error changing password:', err);
  //       alert('Failed to change password. Try again.');
  //     }
  //   });
  // }

}



// ngOnInit(): void {
//   // Retrieve the email stored in NgRx from the forgot password step

//   this.store.select((state) => state.forgotPassword.email)
//     .pipe(take(1))
//     .subscribe((email) => {
//       if (email) {
//         this.email = email;
//         localStorage.setItem('resetEmail', email); // ✅ Store in localStorage
//       } else {
//         const storedEmail = localStorage.getItem('resetEmail');
//         if (storedEmail) {
//           this.email = storedEmail; // ✅ Use stored email if available
//         } else {
//           console.log("No email found, redirecting...");
//           this.router.navigate(['/forgot-password']);
//         }
//       }
//     });

// this.store.select((state) => state.forgotPassword.email).subscribe((email) => {
//   console.log(email);
//   if (email) {
//     this.email = email;
//   } else {
//     console.log("Came To page");
//     this.router.navigate(['/forgot-password']); // Redirect if no email found
//   }
// });
// }
