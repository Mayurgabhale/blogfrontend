import { Component } from '@angular/core';
import { AllBlogEntriesComponent } from "../all-blog-entries/all-blog-entries.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AllBlogEntriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
