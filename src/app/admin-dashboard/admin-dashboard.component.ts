import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent  implements OnInit {

  users: any[] = [];
  selectedUser: any = null;
  subscribers: any[] = [];
  contacts: any[] = [];

  constructor(private userService: DataService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchSubscribers();
    this.fetchContacts();
  }

  fetchUsers(): void {
    this.userService.getUserData().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  editUser(user: any): void {
    this.selectedUser = { ...user };
    
  }

  updateUser(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser).subscribe(
        (response) => {
          this.toastr.success('User updated successfully!');
          // alert('User updated successfully!');
          this.fetchUsers();
          this.selectedUser = null;
        },
        (error) => {console.error('Error updating user:', error);
        }
        
      );
    }
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        this.toastr.success('User deleted successfully!');
        // alert('User deleted successfully!');
        this.fetchUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }


  fetchSubscribers(): void {
    this.userService.getSubscribers().subscribe(
      (data) => {
        this.subscribers = data;
      },
      (error) => {
        console.error('Error fetching subscribers:', error);
      }
    );
  }

  fetchContacts(): void {
    this.userService.getContacts().subscribe(
      (data) => {
        this.contacts = data;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }
}