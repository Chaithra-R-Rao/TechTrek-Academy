import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: false,

  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  backgroundImage: string = 'assets/images/Img3.jpg';
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService,private toastr: ToastrService) {

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

          this.toastr.success('Your details have been submitted.','Thank you for contacting us!');
       
          this.contactForm.reset(); // Clear the form
        },
        (error) => {
          console.error('Error submitting contact details:', error);
          this.toastr.warning('An error occurred while submitting your details', 'Please try again later.');

        }
      );
    }
  }
}
