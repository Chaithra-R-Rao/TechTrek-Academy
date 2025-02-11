import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { sendResetEmail,sendResetEmailSuccess } from '../store/actions/forgot-password.actions';
import { EmailService } from '../email.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup;
  storedEmail: string | null = null;

  constructor(private fb: FormBuilder, private store: Store,private emailService: EmailService,private toastr: ToastrService,    private router: Router,
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
 
  }
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      
      // this.store.dispatch(sendResetEmail({ email }));
  
      this.emailService.sendResetEmail(email).subscribe({
        next: () => {
          this.toastr.success('Reset link sent successfully. Check your email.');
        },
        error: (err) => {
          this.toastr.warning('Failed to send reset link. Try again.');
          console.error(err);
        }
      });
    }
  }
  
}




  // onSubmit() {
  //   if (this.forgotPasswordForm.valid) {
  //     const email = this.forgotPasswordForm.value.email;
      
  //     this.store.dispatch(sendResetEmail({ email }));

  //     setTimeout(() => {
  //       localStorage.setItem('resetEmail', email);
  //       this.store.dispatch(sendResetEmailSuccess({ email })); // ✅ Ensure success action stores email
  //     }, 1000);
    

      
  //     this.emailService
  //       .sendResetEmail(email)
  //       .then(() => {
  //         this.toastr.success('Reset link sent successfully. Check your email.');
  //         // alert('Reset link sent successfully. Check your email.');
  //       })
  //       .catch((error) => {
  //         this.toastr.warning('Failed to send reset link. Try again.');
  //         // alert('Failed to send reset link. Try again.');
  //         console.error(error);
  //       });
  //   }
  // }
