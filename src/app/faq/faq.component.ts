import { Component, OnInit } from '@angular/core';

import { FaqService } from '../faq.service';
import { IFaq } from '../IFaq';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-faq',
  standalone: false,
  
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit {

  protected title = 'app';
  backgroundImage: string = 'assets/images/faq1.png';
 // protected users$: Observable<IUser[]>;
 
faqs$!: IFaq[];
  constructor(public userservice: FaqService) {}

  ngOnInit() {
    this.userservice.getUsers().subscribe(res => {
      this.faqs$ = res;
    });
  }


  // faqs = [
  //   { question: 'How can I receive your notifications?', answer: 'You can subscribe to our newsletter and get all the information via email...' },
  //   { question: 'How can I contact you?', answer: 'You can contact us via our contact page or email support.' },
  //   { question: 'What are your support hours?', answer: 'Our support hours are Monday to Friday, 9 AM to 6 PM.' },
  //   { question: 'Do you have any vacancy?', answer: 'Yes, you can find the latest job openings on our careers page.' },
  //   { question: 'Do you have any partnership program?', answer: 'Yes, we offer a partnership program. Reach out to us for more details.' }
  // ];
}
