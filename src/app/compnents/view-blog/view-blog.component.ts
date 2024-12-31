import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BlogService } from '../../services/blog-service/blog.service';
import { map, Observable, switchMap } from 'rxjs';
import { BlogEntry } from '../../model/blog-entry.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-blog.component.html',
  styleUrl: './view-blog.component.scss'
})
export class ViewBlogComponent implements OnInit {

  blogEntry$: Observable<BlogEntry> = this.activatedRoute.params.pipe(
    switchMap((params:Params) => {
      const blogEntrtyId:number = parseInt(params['id']);
      return this.blogService.findOne(blogEntrtyId).pipe(
        map((blogEntrty:BlogEntry) => blogEntrty)
      )
    })
  )
  
constructor(private activatedRoute:ActivatedRoute,private blogService:BlogService){}
   
  ngOnInit(): void {
      
  }
}
