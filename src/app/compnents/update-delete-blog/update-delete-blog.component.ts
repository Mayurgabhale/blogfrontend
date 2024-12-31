import { Component } from '@angular/core';
import { BlogEntry } from '../../model/blog-entry.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog-service/blog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-delete-blog',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './update-delete-blog.component.html',
  styleUrl: './update-delete-blog.component.scss'
})
export class UpdateDeleteBlogComponent {

  blogs: BlogEntry[] = [];
  blogForm: FormGroup;
  selectedBlogId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAllBlogs();
  }

  loadAllBlogs(): void {
    this.blogService.indexAll(1, 10).subscribe({
      next: (data) => {
        this.blogs = data.items;
      },
      error: (err) => console.error('Failed to load blogs:', err)
    });
  }

  selectBlog(blog: BlogEntry): void {
    if (blog.id !== undefined) {
      this.selectedBlogId = blog.id; // Ensure id is not undefined
      this.blogForm.patchValue({
        title: blog.title,
        description: blog.description
      });
    } else {
      console.error('Blog ID is undefined');
    }
  }
  

  updateBlog(): void {
    if (this.blogForm.valid && this.selectedBlogId !== null) {
      const updatedBlog: BlogEntry = {
        id: this.selectedBlogId,
        ...this.blogForm.value
      };

      this.blogService.update(updatedBlog).subscribe({
        next: () => {
          console.log('Blog updated successfully!');
          this.selectedBlogId = null;
          this.blogForm.reset();
          this.loadAllBlogs();
        },
        error: (err) => console.error('Failed to update blog:', err)
      });
    }
  }

  deleteBlog(blogId: number): void {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.delete(blogId).subscribe({
        next: () => {
          console.log('Blog deleted successfully!');
          this.loadAllBlogs();
        },
        error: (err) => console.error('Failed to delete blog:', err)
      });
    }
  }
  



}
