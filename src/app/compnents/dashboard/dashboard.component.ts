import { Component, OnInit } from '@angular/core';
import { CreateBlogComponent } from '../create-blog/create-blog.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { RouterLink } from '@angular/router';
import { UpdateDeleteBlogComponent } from '../update-delete-blog/update-delete-blog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CreateBlogComponent,UserProfileComponent,RouterLink,UpdateDeleteBlogComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  user: any = null; // Store the user data

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    const userData = localStorage.getItem('bloguser');
    if (userData) {
      this.user = JSON.parse(userData); // Parse user data from localStorage
      console.log('User data fetched:', this.user); // Debugging log
    } else {
      console.log('No user data found in localStorage.');
    }
  }
}
