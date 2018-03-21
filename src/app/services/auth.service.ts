import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { tokenNotExpired } from 'angular2-jwt';

import { User } from './../models/user.model';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

   apiUrl = environment.apiUrl;

   constructor(
      private http: HttpClient
   ) { }

   signUp(user: User) {
      return this.http.post(this.apiUrl + 'auth/signUp', user);
   }

   signIn(user: User) {
      return this.http.post(this.apiUrl + 'auth/signIn', user);
   }

   checkUsername(username: string): Observable<boolean> {
      return this.http.get(this.apiUrl + 'auth/checkUsername?username=' + username)
         .map((res: any) => res.isUsernameAvailable);
   }

   checkEmail(email: string): Observable<boolean> {
      return this.http.get(this.apiUrl + 'auth/checkEmail?email=' + email)
         .map((res: any) => res.isEmailAvailable);
   }

   isLoggedIn(): boolean {
      return tokenNotExpired();
   }
}