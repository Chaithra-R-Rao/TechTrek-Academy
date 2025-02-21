import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) { }
  // protected url = 'http://localhost:000';

  getUsers(): Observable<any> {
    return this
      .http
      .get("http://localhost:3000/faqs")
      .pipe(
        map(res => res)
      );
  }
}
