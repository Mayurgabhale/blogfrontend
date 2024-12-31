import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogEntriesPageable } from '../../model/blog-entry.interface';
import { BlogService } from '../../services/blog-service/blog.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-blog-entries',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './all-blog-entries.component.html',
  styleUrl: './all-blog-entries.component.scss'
})
export class AllBlogEntriesComponent  {
  @Input() blogEntries!: BlogEntriesPageable

  
  dataSource:Observable<BlogEntriesPageable> = this.blogService.indexAll(1,10)
  constructor(private blogService:BlogService){}

  
}
