
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-popularcourse',
  standalone: false,
  
  templateUrl: './popularcourse.component.html',
  styleUrl: './popularcourse.component.css'
})
export class PopularcourseComponent implements OnInit {
  courses: any[] = [];
  filteredCourses: any[] = [];
  enrolledCourses: any[] = [];
  private readonly userEmailKey = 'userEmail';


   constructor(private courseService: DataService, private authService: AuthService, private router: Router, private toastr: ToastrService) { }
  
   

  ngOnInit(): void {
    this.fetchCourses();
    this.fetchEnrolledCourses();
  }


   fetchEnrolledCourses(): void {
    const studentEmail = localStorage.getItem(this.userEmailKey);
    if (studentEmail) {
      this.courseService.getUserCourses().subscribe(
        (data) => {
          this.enrolledCourses = data.filter((course) => course.email === studentEmail);
        },
        (error) => {
          console.error('Error fetching enrolled courses:', error);
        }
      );
    }
  }

  enroll(courseTitle: string): void {
    if (!this.authService.isAuthenticated()) {
      this.toastr.warning('Please login to enroll!', 'Warning');
      // alert('Please login to enroll!');

      // Redirect to login page if the user is not logged in
      this.router.navigate(['/login']);
      return;
    }

    const studentEmail = localStorage.getItem(this.userEmailKey);
    const alreadyEnrolled = this.enrolledCourses.some(
      (course) => course.courseTitle === courseTitle
    );
    
    if (alreadyEnrolled) {
      this.toastr.info('You are already enrolled in this course!', 'Info');
      // alert('You are already enrolled in this course!');
      return;
    }

    const enrollmentData = {
      email: studentEmail,
      courseTitle: courseTitle,
      enrollmentType: 'enrolled',
    };

    this.courseService.enrollUser(enrollmentData).subscribe({
      next: (response) => {
        this.toastr.success('Enrolled successfully in the course!', 'Congratulations!');
        // alert('Enrolled successfully in the course!');
        console.log('Enrollment Data:', response);
      },
      error: (err) => {
        console.error('Error during enrollment:', err);
      },
    });
  }



  fetchCourses(): void {
    this.courseService.getCourses().subscribe(
      (data) => {
        this.courses = data;

        // Sort courses by rating in descending order and take the top 4
        this.filteredCourses = this.courses
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);
      },
      (error) => {
        console.error('Error fetching course data:', error);
      }
    );
  }
}

