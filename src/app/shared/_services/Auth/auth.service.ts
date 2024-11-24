import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 

  }

  googleLogin(token: string): Observable<any> {
    return this.http.post<any>(`${env.baseURL}/google-login`, { token });
  }

  googleSignInUsingFirebase(IdToken:any): Observable<any> {
    console.log("serviceee")
    let api_key='AIzaSyA57hqptnj0Z1fAWXa_rwao3RrF_66CnDw'
    return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${api_key}`,
      {"postBody":`id_token=${IdToken}&providerId=google.com`,
        "requestUri":"http://localhost/login",
        "returnIdpCredential":true,
        "returnSecureToken":true}
    )
  }

 

}
