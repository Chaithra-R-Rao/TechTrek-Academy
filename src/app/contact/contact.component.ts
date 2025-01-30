import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';


@Component({
  selector: 'app-contact',
  standalone: false,
  
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent  {

  backgroundImage: string = 'assets/images/Img3.jpg';
  contactForm: FormGroup;

  // constructor(private fb: FormBuilder) {}

  
  constructor(private fb: FormBuilder,private dataService: DataService) {
   
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }


  onSubmit(): void {
    if (this.contactForm.valid) {
      const contactDetails = this.contactForm.value;

      this.dataService.postUserContact(contactDetails).subscribe(
        (response) => {
          console.log('Contact details submitted successfully:', response);
          alert('Thank you for contacting us! Your details have been submitted.');
          this.contactForm.reset(); // Clear the form
        },
        (error) => {
          console.error('Error submitting contact details:', error);
          alert('An error occurred while submitting your details. Please try again later.');
        }
      );
    }
  }
  // onSubmit(): void {
  //   if (this.contactForm.valid) {
  //     console.log(this.contactForm.value);
  //     // Handle form submission
  //   }
  // }
}
