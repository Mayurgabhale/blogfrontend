import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  findOne(id:number):Observable<User>{
    return this.http.get('/api/users/'+id).pipe(
      map((user:User) => user)
    )
  }

  updateOne(user: User): Observable<User> {
    return this.http.put<User>('api/users/' + user.id, user);
  }
}
