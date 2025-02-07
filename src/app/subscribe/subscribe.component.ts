import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { EmailService } from '../email.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscribe',
  standalone: false,
  
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent  implements OnInit {
  isModalOpen: boolean = false;
  message: string = '';
  subscriptionData = {
    name: '',
    email: ''
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private dataService: DataService,private emailService: EmailService,private toastr: ToastrService) {}

  ngOnInit(): void {
    // Open the modal automatically after 2.5 seconds
    setTimeout(() => {
      this.isModalOpen = true;
    }, 2500);
  }


  subscribe(form: any): void {
    if (form.valid) {
      // Check if email is already subscribed
      this.dataService.getSubscribers().subscribe(
        (subscribers) => {
          const alreadySubscribed = subscribers.some(
            (subscriber: any) => subscriber.email === form.value.email
          );
          
          if (alreadySubscribed) {
            this.toastr.info('You are already subscribed to the newsletter.');
            this.closeModal();
          } else {
            this.sendSubscription(form);
          }
        },
        (error) => {
          console.error('Error fetching subscribers:', error);
          this.toastr.error(
            'There was an error checking subscription status. Please try again.'
          );
        }
      );
    }
  }

  private sendSubscription(form: any): void {
    const formData = {
      from_name: 'TechTrek Academy',
      to_name: form.value.name,
      to_email: form.value.email,
      message: `Thank you ${form.value.name} for subscribing to our newsletter. You will receive news on the latest courses and offers soon.`,
    };
    console.log(formData);

    this.emailService
      .sendEmail(formData)
      .then(() => {
        this.successMessage = `Thank you ${form.value.name} for subscribing!`;
        this.errorMessage = null;
        form.reset();
      })
      .catch((error) => {
        this.errorMessage =
          'There was an issue sending the email. Please try again.';
        this.successMessage = null;
        console.error('Email sending failed:', error);
      });

    this.dataService.postSubscriberData(this.subscriptionData).subscribe(
      (response) => {
        this.message = `Thank you for subscribing with ${this.subscriptionData.email}!`;
        this.resetForm(form);

        // Close modal after 2 seconds
        setTimeout(() => {
          this.closeModal();
        }, 2000);
      },
      (error) => {
        console.error('Error posting subscription details:', error);
        this.toastr.error(
          'An error occurred while subscribing. Please try again later.'
        );
      }
    );
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  resetForm(form: any): void {
    form.resetForm();
    this.subscriptionData = { name: '', email: '' };
  }
 
}
