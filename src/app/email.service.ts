import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {

  private apiUrl = 'http://localhost:3000/user-data';
  constructor(private http: HttpClient) {
    emailjs.init('Q126QojCp6qTVDN7w'); // Replace with your EmailJS public key
  }

  sendEmail(formData: any): Promise<void> {

    return emailjs
      .send('service_j34toeg', 'template_6s5eoug', formData) // Replace with actual Service ID and Template ID
      .then(() => {
        console.log('Email sent successfully');
      })
      .catch((error) => {
        console.error('Error sending email:', error); // Log errors
        throw error;
      });
  }


  sendResetEmail(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      switchMap(users => {
        if (users.length === 0) return throwError(() => new Error('Email not found'));

        const user = users[0];
        const resetToken = uuidv4();
        const expiryTime = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 mins expiry
    
        
        return this.http.patch<any>(`${this.apiUrl}/${user.id}`, {
          resetToken,
          resetTokenExpiry: expiryTime
        }).pipe(
          switchMap(() => {
            const templateParams = {
              to_email: email,
              from_name: 'TechTrek Academy',
              reset_link: `https://chaithra-r-rao.github.io/TechTrek-Academy/change-password?token=${resetToken}`
            };

            return from(emailjs.send('service_j34toeg', 'template_pq92fxg', templateParams));
          })
        );
      })
    );
  }

// sendResetEmail(email: string): Promise<void> {

//   const resetToken = uuidv4(); // Generate a unique token
//   const expiryTime = Date.now() + 30 * 60 * 1000; // Current time + 30 minutes

//   // Store token and expiry in localStorage
//   localStorage.setItem(`resetToken-${email}`, JSON.stringify({ token: resetToken, expiry: expiryTime }));

 
//   const templateParams = {
//     to_email: email,
//     from_name: 'TechTrek Academy',
//     reset_link: `http://localhost:4200/change-password?email=${email}`, // Change to your actual frontend URL
//   };

//   console.log(templateParams);
  
//   return emailjs
//     .send('service_j34toeg', 'template_pq92fxg', templateParams) // Replace with actual Service ID and Template ID
//     .then(() => {
//       console.log('Reset email sent successfully');
//     })
//     .catch((error) => {
//       console.error('Error sending reset email:', error);
//       throw error;
//     });
// }
}

 