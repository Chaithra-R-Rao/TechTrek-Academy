import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private apiUrl = 'http://localhost:3000/user-data';

  constructor(private http: HttpClient) {}

  addUserdata(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  

  getUserData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching user data:', error);
        return throwError(() => error);
      })
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user);
  }

  updateUserData(userId: string, updatedData: any) {
    return this.http.put(`${this.apiUrl}/${userId}`, updatedData); // Replace with your API endpoint
  }
  

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }

  getUserByEmail(email: string): Observable<any> {
    const url = `${this.apiUrl}?email=${email}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error fetching user by email:', error);
        return throwError(() => error);
      })
    );
  }

  getUserById(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error('Error fetching user by ID:', error);
        return throwError(() => error);
      })
    );
  }
  private apiUrl2 = 'http://localhost:3000/user-contact'; // Adjust endpoint as needed

  postUserContact(contactDetails: any): Observable<any> {
    return this.http.post<any>(this.apiUrl2, contactDetails).pipe(
      catchError((error) => {
        console.error('Error posting contact details:', error);
        return throwError(() => error);
      })
    );
  }
  
  getContacts(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl2);
  }


  private subscriberApiUrl = 'http://localhost:3000/subscriber-data'; // Adjust endpoint as needed

 
  postSubscriberData(subscriber: any): Observable<any> {
    return this.http.post<any>(this.subscriberApiUrl, subscriber).pipe(
      catchError((error) => {
        console.error('Error posting subscriber data:', error);
        return throwError(() => error);
      })
    );
  }

  getSubscribers(): Observable<any> {
    return this.http.get<any[]>(this.subscriberApiUrl);
  }
  
  //Courses
  private dataUrl = 'http://localhost:3000/courses'; // Path to data.json

 
  getCourses(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }

  addCourse(course: any): Observable<any> {
    return this.http.post<any>(this.dataUrl, course);
  }

  updateCourse(course: any): Observable<any> {
    return this.http.put<any>(`${this.dataUrl}/${course.id}`, course);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete<any>(`${this.dataUrl}/${courseId}`);
  }



  private userCourseApiUrl = 'http://localhost:3000/user-course'; // URL for json-server


  // Method to enroll a user in a course
  enrollUser(courseEnrollment: any): Observable<any> {
    return this.http.post<any>(this.userCourseApiUrl, courseEnrollment).pipe(
      catchError((error) => {
        console.error('Error enrolling user:', error);
        return throwError(() => error);
      })
    );
  }

    // Fetch user-course data
    getUserCourses(): Observable<any[]> {
      return this.http.get<any[]>(this.userCourseApiUrl);
    }

    deleteEnrolledCourse(courseId: string): Observable<any> {
      return this.http.delete(`${this.userCourseApiUrl}/${courseId}`);
    }
}
