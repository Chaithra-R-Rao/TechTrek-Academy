import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';

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
 
imagePreview: string | ArrayBuffer | null = null;
editImagePreview: string | ArrayBuffer | null = null;

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

  addCourse(form: NgForm): void {
    if (form.invalid) {
      this.toastr.warning('Please fill in all required fields correctly!');
      return;
    }
  
    this.courseService.addCourse(this.newCourse).subscribe(() => {
      this.toastr.success('Course added successfully!');
      this.newCourse = { title: '', author: '', rating: 0, price: 0, image: '' };
      this.imagePreview = null; // Reset image preview
      form.resetForm(); // Reset the form
      this.loadCourses();
    });
  }
  // addCourse(): void {
  //   if (this.newCourse.title && this.newCourse.author) {
  //     this.courseService.addCourse(this.newCourse).subscribe(() => {
  //       this.newCourse = { title: '', author: '', rating: 0,  price: 0, image: '' };
  //       this.loadCourses();
  //     });
  //   }
  //   this.toastr.success('Course added successfully!');

  // }

  editCourse(course: any): void {

    this.selectedCourse = { ...course }; // Clone the course object for editing
    this.scrollToEditSection();

  }


  updateCourse(form: NgForm): void {
    if (form.invalid) {
      this.toastr.warning('Please fill in all required fields correctly!');
      return;
    }
  
    if (this.selectedCourse) {
      this.courseService.updateCourse(this.selectedCourse).subscribe(() => {
        this.toastr.success('Course updated successfully!');
        this.selectedCourse = null;
        this.editImagePreview = null; // Reset image preview
        form.resetForm(); // Reset the form
        this.loadCourses();
      });
    }
  }
  // updateCourse(): void {
  //   if (this.selectedCourse) {
  //     this.courseService.updateCourse(this.selectedCourse).subscribe(() => {
  //       this.selectedCourse = null;
  //       this.loadCourses();
  //     });
  //     this.toastr.success('Course updated successfully!');
  //   }
  // }

  deleteCourse(courseId: number): void {
    this.courseService.deleteCourse(courseId).subscribe(() => {
      this.loadCourses();
    });
    this.toastr.success('Course deleted successfully!');
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
  
    if (!file) return;
  
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 2 * 1024 * 1024; // 2MB
  
    if (!allowedTypes.includes(file.type)) {
      this.toastr.warning('Invalid file format! Please upload a JPG or PNG image.');
      return;
    }
  
    if (file.size > maxSize) {
      this.toastr.warning('File is too large! Please upload an image smaller than 2MB.');
      return;
    }
  
    this.selectedFile = file;
  
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreview = reader.result;
      this.newCourse.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  
  onFileEdit(event: any): void {
    const file = event.target.files[0];
  
    if (!file) return;
  
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 2 * 1024 * 1024; // 2MB
  
    if (!allowedTypes.includes(file.type)) {
      this.toastr.warning('Invalid file format! Please upload a JPG or PNG image.');
      return;
    }
  
    if (file.size > maxSize) {
      this.toastr.warning('File is too large! Please upload an image smaller than 2MB.');
      return;
    }
  
    this.selectedFileEdit = file;
  
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.editImagePreview = reader.result;
      this.selectedCourse.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  
  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0];
  //   if (this.selectedFile) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.imagePreview = reader.result; // Store preview URL

  //       this.newCourse.image = e.target.result;
  //     };
  //     reader.readAsDataURL(this.selectedFile);
  //   }
  // }
  // onFileEdit(event: any): void {
  //   this.selectedFileEdit = event.target.files[0];
  //   if (this.selectedFileEdit) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.editImagePreview = reader.result; // Store preview URL

  //       this.selectedCourse.image = e.target.result;
  //     };
  //     reader.readAsDataURL(this.selectedFileEdit);
  //   }
  // }
  scrollToEditSection() {
    this.editCourseSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}
