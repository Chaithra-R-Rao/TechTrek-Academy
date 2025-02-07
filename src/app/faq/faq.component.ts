import { Component, OnInit } from '@angular/core';

import { FaqService } from '../faq.service';
import { IFaq } from '../IFaq';


@Component({
  selector: 'app-faq',
  standalone: false,
  
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit {

  protected title = 'app';
 
faqs$!: IFaq[];
  constructor(public userservice: FaqService) {}

  ngOnInit() {
    this.userservice.getUsers().subscribe(res => {
      this.faqs$ = res;
    });
  }

}
