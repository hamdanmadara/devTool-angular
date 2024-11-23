import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/Auth/auth.service';
import { SocialSignInService } from 'src/app/shared/_services/SocialSignIn/social-sign-in.service';
declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  avail: boolean=false;
  msg: string='';

  constructor(private fb: FormBuilder,private router: Router,
    private auth: AuthService,private socialSIgnIn: SocialSignInService) {
    // Initialize the form with validation rules
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email] // Email must be valid and required
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6) // Minimum 6 characters for password
        ]
      ]
    });
  }

  // Convenience getter for easy access to form controls in the template
  get f() {
    return this.loginForm.controls;
  }

  // Function to handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Username:', email);
      console.log('Password:', password);
      alert(`Logged in as: ${email}`);
      // Add actual login functionality here
    } 
    // else {
    //   this.markAllFieldsAsTouched(); // Marks all fields as touched to show validation feedback
    // }
  }

  // Marks all form fields as touched for validation feedback
  // markAllFieldsAsTouched() {
  //   Object.keys(this.loginForm.controls).forEach(field => {
  //     const control = this.loginForm.get(field);
  //     control?.markAsTouched({ onlySelf: true });
  //   });
  // }

  ngOnInit(): void {
    this.socialSIgnIn.initializeGoogleAuth().then(() => {
      console.log('Google Auth initialized');
    });
  }

  // ngAfterViewInit(){
  //   this.initializeGoogleSignIn();

  // }
  signInWithGoogle(): void {
    this.socialSIgnIn
      .googleSignIn()
      .then((response:any) => {
        console.log('Login success:', response);
      })
      .catch((error:any) => {
        console.error('Login error:', error);
      });
  }


  initializeGoogleSignIn() {
    // debugger
    google.accounts.id.initialize({
      client_id: '497303743191-v23hp6hs508m8sgeerbhc7k83aj1ij0g.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this)
    });
    
    google.accounts.id.prompt(); 
  }

  triggerGoogleSignIn() {
    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Try manual rendering
        google.accounts.id.renderButton(
          document.getElementById("googleLoginButton"),
          { theme: "outline", size: "large", text: "continue_with" }
        );
      }
    });
  }
  handleCredentialResponse(response: any) {
    this.auth.googleLogin(response.credential).subscribe(
      (res) => {
        if (res.isNewUser) {
          // Handle new user registration
          console.log('New user registered via Google');
        } else {
          // Handle existing user login
          console.log('Existing user logged in via Google');
        }
          const redirectUrl = ''
          const defaultRedirectUrl = '/user';
  
          // Use the router's navigateByUrl method to navigate and reload the page
          this.router.navigateByUrl(redirectUrl || defaultRedirectUrl).then(() => {
            window.location.reload();
          });
        }
      ,
      (error) => {
        console.error('Google authentication failed', error);
        this.avail = true;
        this.msg = 'Google authentication failed. Please try again.';
      }
    );
  }

}
