import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BlogEntriesPageable, BlogEntry } from '../../model/blog-entry.interface';




  

  





// ---------------------------


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  findOne(id: number): Observable<BlogEntry> {
    return this.http.get<BlogEntry>('/api/blogs/' + id);
  }

  indexAll(page: number, limit: number): Observable<BlogEntriesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<BlogEntriesPageable>('/api/blogs', {params});
  }

  indexByUser(userId: number, page: number, limit: number): Observable<BlogEntriesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<BlogEntriesPageable>('/api/blogs/user/' + String(userId), {params});
  }

  post(blogEntry: BlogEntry): Observable<BlogEntry> {
    return this.http.post<BlogEntry>('/api/blogs', blogEntry);
  }



  update(blogEntry: BlogEntry): Observable<BlogEntry> {
    return this.http.put<BlogEntry>('/api/blogs/' + blogEntry.id, blogEntry);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>('/api/blogs/' + id);
  }

  uploadHeaderImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('/api/blogs/image/upload', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  
}