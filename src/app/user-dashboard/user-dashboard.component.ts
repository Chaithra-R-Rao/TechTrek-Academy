import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl  } from '@angular/forms';
import { DataService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { select, Store } from '@ngrx/store';
import { setUser } from '../store/actions/user.actions';
import { UserState } from '../store/reducers/user.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: any = null; // Store user data here
  errorMessage: string | null = null;
  enrolledCourses: any[] = []; // List of enrolled courses
  editMode: boolean = false; // Toggle edit mode
  editForm!: FormGroup; // Reactive form for editing user details

  isDialogOpen: boolean = false; // Controls the visibility of the dialog
  selectedCourseId: string | null = null;
   // Store the course ID for deletion
  private readonly userEmailKey = 'userEmail';


  user$: Observable<UserState>;
  constructor(
    private dataService: DataService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private store: Store<{ user: UserState }>
  ) {
    this.user$ = this.store.pipe(select('user'));
  }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    const studentEmail = localStorage.getItem(this.userEmailKey);

    if (studentEmail) {
      this.dataService.getUserData().subscribe({
        next: (users) => {
          // Find the user with the matching email
          this.user = users.find((user) => user.email === studentEmail) || null;

          if (this.user) {
            this.initEditForm(); // Initialize the form with user data
            this.fetchEnrolledCourses(this.user.email); // Fetch courses for the logged-in user
  
            this.store.dispatch(setUser({ user: { fullName: this.user.fullName, email: this.user.email } }));
     
          } else {
            this.errorMessage = 'No user data found.';
          }
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
          this.errorMessage = 'Error fetching user data. Please try again later.';
        }
      });
    } else {
      this.errorMessage = 'No user email found in local storage.';
    }
  }

  initEditForm(): void {
    // Initialize the form with the user's current details
    this.editForm = this.fb.group({
      fullName: [this.user?.fullName, [Validators.required,this.nameValidator]],
      email: [this.user?.email, [Validators.required, Validators.email]],
      dob: [this.user?.dob, [Validators.required, this.validateDateNotFuture.bind(this)]]
    });
  }

   nameValidator(control: AbstractControl): { [key: string]: any } | null {
      const name = control.value;
      if (name && /\d/.test(name)) { // Check if name contains any number
        return { invalidName: true };
      }
      return null;
    }
  
    validateDateNotFuture(control: any): { [key: string]: boolean } | null {
      const inputDate = new Date(control.value);
      const today = new Date();
      if (control.value && inputDate > today) {
        return { futureDate: true };
      }
      return null;
    }
    
  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.initEditForm(); // Reset the form if canceled
    }
  }

  updateUser(): void {
    if (this.editForm.valid) {
      const updatedData = { ...this.user, ...this.editForm.value };

      this.dataService.updateUserData(this.user.id, updatedData).subscribe({
        next: () => {
          this.toastr.success('Data updated successfully');
          this.user = updatedData; 

          this.store.dispatch(
            setUser({ user: { fullName: updatedData.fullName, email: updatedData.email } })
          );
          this.editMode = false; 
        },
        error: (error) => {
          console.error('Error updating user:', error);
          this.errorMessage = 'Error updating user details. Please try again later.';
        }
      });
    }
  }

  fetchEnrolledCourses(email: string): void {
    this.dataService.getUserCourses().subscribe({
      next: (courses) => {
        // Filter courses for the logged-in user
        this.enrolledCourses = courses.filter((course) => course.email === email);
      },
      error: (error) => {
        console.error('Error fetching enrolled courses:', error);
        this.errorMessage = 'Error fetching enrolled courses. Please try again later.';
      }
    });
  }

   // Open the dialog and store the course ID
   openDialog(courseId: string): void {
    this.isDialogOpen = true;
    this.selectedCourseId = courseId;
  }

  // Close the dialog without taking action
  closeDialog(): void {
    this.isDialogOpen = false;
    this.selectedCourseId = null;
  }

  // Confirm deletion of the course
  confirmDeletion(): void {
    if (this.selectedCourseId) {
      this.dataService.deleteEnrolledCourse(this.selectedCourseId).subscribe({
        next: () => {
          this.enrolledCourses = this.enrolledCourses.filter(
            (course) => course.id !== this.selectedCourseId
          );
          this.toastr.success('Course deleted successfully');
          this.closeDialog();
        },
        error: (error) => {
          console.error('Error removing enrollment:', error);
          this.errorMessage =
            'Error removing enrollment. Please try again later.';
          this.closeDialog();
        },
      });
    }
  }
}

