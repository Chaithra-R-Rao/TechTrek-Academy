import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-faculty-dashboard',
  standalone: false,

  templateUrl: './faculty-dashboard.component.html',
  styleUrl: './faculty-dashboard.component.css'
})
export class FacultyDashboardComponent implements OnInit {

  @ViewChild('editCourseSection') editCourseSection!: ElementRef;

  courses: any[] = [];
  newCourse = { title: '', author: '', rating: 0, price: 0, image: '' };
  selectedCourse: any = null;
  selectedFile: File | null = null;
  selectedFileEdit: File | null = null;

  private readonly userEmailKey = 'userEmail';
  loggedInUser: any = null;

  // loggedInUser =localStorage.getItem(this.userEmailKey);

  constructor(private courseService: DataService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadCourses();
    this.fetchUserData();
  }


  fetchUserData(): void {
    const teacherEmail = localStorage.getItem(this.userEmailKey);
    if (teacherEmail) {
      this.courseService.getUserData().subscribe({
        next: (users) => {
          this.loggedInUser = users.find(user => user.email === teacherEmail) || null;
          console.log(this.loggedInUser);
          if (this.loggedInUser) {
            this.newCourse.author = this.loggedInUser.fullName; // Set the author's name
          } else {
            console.error('No user data found.');
          }
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
        },
      });
    } else {
      console.error('No user email found in local storage.');
    }
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    });

  }


  addCourse(): void {
    if (this.newCourse.title && this.newCourse.author) {
      this.courseService.addCourse(this.newCourse).subscribe(() => {
        this.newCourse = { title: '', author: '', rating: 0,  price: 0, image: '' };
        this.loadCourses();
      });
    }
    this.toastr.success('Course added successfully!');

  }

  editCourse(course: any): void {

    this.selectedCourse = { ...course }; // Clone the course object for editing
    this.scrollToEditSection();

  }

  updateCourse(): void {
    if (this.selectedCourse) {
      this.courseService.updateCourse(this.selectedCourse).subscribe(() => {
        this.selectedCourse = null;
        this.loadCourses();
      });
      this.toastr.success('Course updated successfully!');
    }
  }

  deleteCourse(courseId: number): void {
    this.courseService.deleteCourse(courseId).subscribe(() => {
      this.loadCourses();
    });
    this.toastr.success('Course deleted successfully!');
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newCourse.image = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  onFileEdit(event: any): void {
    this.selectedFileEdit = event.target.files[0];
    if (this.selectedFileEdit) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedCourse.image = e.target.result;
      };
      reader.readAsDataURL(this.selectedFileEdit);
    }
  }
  scrollToEditSection() {
    this.editCourseSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}
