import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeleteBlogComponent } from './update-delete-blog.component';

describe('UpdateDeleteBlogComponent', () => {
  let component: UpdateDeleteBlogComponent;
  let fixture: ComponentFixture<UpdateDeleteBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateDeleteBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDeleteBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
