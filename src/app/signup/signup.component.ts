import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { DataService } from '../data.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: false,
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  @Input() title: string = 'Sign Up here and start your journey';
  @Input() message: string = 'Sign Up';

  maxDate: string; 
 
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: DataService, private toastr: ToastrService) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required,this.nameValidator]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required, this.validateDateNotFuture.bind(this)]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      role: ['', Validators.required],
      phone: ['',this.phoneValidator]
    });

    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  nameValidator(control: AbstractControl): { [key: string]: any } | null {
    const name = control.value;
    if (name && /\d/.test(name)) { // Check if name contains any number
      return { invalidName: true };
    }
    return null;
  }

  validateDateNotFuture(control: any): { [key: string]: boolean } | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    if (control.value && inputDate > today) {
      return { futureDate: true };
    }
    return null;
  }
  
  phoneValidator(control: AbstractControl): { [key: string]: any } | null {
    const phone = control.value;
    if (phone && !/^\d{10}$/.test(phone)) {
      return { invalidPhone: true }; // Return error if phone is not valid
    }
    return null; // Return null if valid
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.userService.addUserdata(this.signupForm.value).pipe(
        catchError(error => {
          console.error('Error adding user:', error);
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          console.log('User added successfully:', response);
          this.toastr.success('User added successfully');
          this.signupForm.reset();
        }
      });
    }
  }
}
