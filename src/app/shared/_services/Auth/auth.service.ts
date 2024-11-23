import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  googleLogin(token: string): Observable<any> {
    return this.http.post<any>(`${env.baseURL}/google-login`, { token });
  }
}
