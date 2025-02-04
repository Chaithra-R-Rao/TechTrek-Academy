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

  backgroundImage: string = 'assets/images/Img3.jpg'; 
 
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: DataService, private toastr: ToastrService) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // dob: ['', Validators.required],
      dob: ['', [Validators.required, this.validateDateNotFuture.bind(this)]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      role: ['', Validators.required],
      phone: ['',this.phoneValidator]
    });

    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
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
          // alert('User added successfully');
          this.signupForm.reset();
        }
      });
    }
  }
}


  // signupData = {
  //   fullName: '',
  //   email: '',
  //   dob: '',
  //   password: '',
  //   role: '',
  //   phone: '',
  // };

  
  // constructor(private dataService: DataService) {}
  // onSubmit() {
  //   this.dataService.addItem(this.signupData).subscribe(response => {
  //     console.log('Registration Data added:', response);
  //   });
  // }




  // fullName: string = '';
  // email: string = '';
  // dob: string = '';
  // password: string = '';
  // role: string = '';
  // phone: string = '';

  // onSubmit(form: any): void {
  //   if (form.valid) {
  //     console.log('Form Submitted', {
  //       fullName: this.fullName,
  //       email: this.email,
  //       dob: this.dob,
  //       password: this.password,
  //       role: this.role,
  //       phone: this.phone,
  //     });
  //   }
  // }



  // signupForm: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.signupForm = this.fb.group({
  //     fullName: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     dob: ['', Validators.required],
  //     password: ['', Validators.required],
  //     role: ['', Validators.required],
  //     phone: [''],
  //   });
  // }

  // onSubmit() {
  //   if (this.signupForm.valid) {
  //     console.log('Form Submitted', this.signupForm.value);
  //   }
  // }

