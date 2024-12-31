import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Params, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/user.interface';
import { AllBlogEntriesComponent } from "../all-blog-entries/all-blog-entries.component";
import { BlogEntriesPageable } from '../../model/blog-entry.interface';
import { BlogService } from '../../services/blog-service/blog.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnChanges{
 
  @Input() user: any;

  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      console.log('User input in UserProfileComponent changed:', changes['user'].currentValue);
    }
  }




  // private userId$:Observable<number> =  this.activatedRoute.params.pipe(
  //   map((params:Params) => parseInt(params['id']))
  // )
  // private sub!: Subscription;
  // user:User | null = null


  // user$:Observable<User> = this.userId$.pipe(
  //   switchMap((userId:number) =>
  //      this.userService.findOne(userId))
  // )

  // blogEntries$:Observable<BlogEntriesPageable> = this.userId$.pipe(
  //   switchMap((userId:number) => this.blogService.indexByUser(userId, 1,10))
  // )

  // constructor(
  //   private activatedRoute:ActivatedRoute,
  //   private userService:UserService,
  //   private blogService:BlogService
  // ){}

  // onPaginateChange(event:PageEvent){
  //   return 
  // }



  // ngOnInit(): void {
  //     // this.sub = this.activatedRoute.params.subscribe(params => {
  //     //   this.userId = parseInt(params['id']);
  //     //   this.userService.findOne(this.userId).pipe(
  //     //     map((user:User) => this.user = user)
  //     //   ).subscribe()
  //     // })

  // }


  // -----------------------------------------------------


  



}



