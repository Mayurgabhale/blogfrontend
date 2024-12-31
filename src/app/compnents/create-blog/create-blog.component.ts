import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog-service/blog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss'
})
export class CreateBlogComponent implements OnInit {
  form!:FormGroup;
  constructor(private formBuilder:FormBuilder, private blogService:BlogService ){}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        id:[{value:null, disabled:true}],
        title:[null,[Validators.required]],
        slug:[{value:null,disabled:true}],
        description:[null,[Validators.required]],

      })
  }

  
  post(): void {
    if (this.form.valid) {
      this.blogService.post(this.form.getRawValue()).subscribe({
        next: () => {
          window.alert('Blog post created successfully!');
          this.form.reset(); 
        },
        error: (err) => {
          window.alert('An error occurred while creating the blog post. Please try again.');
          console.error(err); 
        },
      });
    } else {
      window.alert('Please fill out all required fields before submitting.');
    }
  }
  

  // onClick(){}

}
