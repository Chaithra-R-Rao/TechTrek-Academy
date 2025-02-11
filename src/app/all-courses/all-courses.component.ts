import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-courses',
  standalone: false,

  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent implements OnInit {

  courses: any[] = []; // Original array of courses
  filteredCourses: any[] = []; // Filtered array for display
  enrolledCourses: any[] = [];

  private readonly userEmailKey = 'userEmail';

  constructor(private courseService: DataService, private authService: AuthService, private router: Router,private toastr: ToastrService) { }

  
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

    const studentEmail = localStorage.getItem(this.userEmailKey); // Replace with logged-in user's email
   
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
        this.toastr.success('Enrolled successfully in the course!','Congratulations!');
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
        this.filteredCourses = data; // Initialize filteredCourses with all courses
      },
      (error) => {
        console.error('Error fetching course data:', error);
      }
    );
  }

  onSearchSubmit(courseName: string): void {
    if (courseName) {
      // Filter courses by name (case-insensitive)
      this.filteredCourses = this.courses.filter((course) =>
        course.title.toLowerCase().includes(courseName.toLowerCase())
      );
    } else {
      // If search is empty, show all courses
      this.filteredCourses = [...this.courses];
    }
  }

}


