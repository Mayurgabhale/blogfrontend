import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { JWT_NAME } from '../services/authentication-service/authentication.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomJwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(JWT_NAME);

    if(token) {
      const clonedReq = request.clone({
        headers: request.headers.set('Authorization',
        'Bearer ' + token)
      });
      return next.handle(clonedReq);
    } else {
      return next.handle(request);
    }
  }
}