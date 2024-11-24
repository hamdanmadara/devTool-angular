import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/Auth/auth.service';
import { SocialSignInService } from 'src/app/shared/_services/SocialSignIn/social-sign-in.service';
import { SocialAuthService,GoogleLoginProvider } from "angularx-social-login";

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
  latestClientId= '497303743191-j40sbqdb39nlfho2h89g0rbkt9ecogod.apps.googleusercontent.com'
  constructor(private fb: FormBuilder,private router: Router,private socialAuthService: SocialAuthService,
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
    // google.accounts.id.initialize({
    //   client_id: this.latestClientId,
    //   callback: this.handleCredentialResponse
    // });
    // google.accounts.id.renderButton(
    //   document.getElementById("buttonDiv"),
    //   { theme: "outline", size: "large" }  // customization attributes
    // );
    // google.accounts.id.prompt(); // also display the One Tap dialog
    // this.socialSIgnIn.initializeGoogleAuth().then(() => {
    //   console.log('Google Auth initialized');
    // });
    // this.socialAuthService.authState.subscribe((user) => {
    //   if (user) {
    //     console.log('User is authenticated:', user);
    //   } else {
    //     console.log('User is not authenticated');
    //   }
    // });
  }


  // ngAfterViewInit(){
  //   this.initializeGoogleSignIn();

  // }
  // initializeGoogleSignIn() {
  //   // debugger
  //   google.accounts.id.initialize({
  //     client_id: this.latestClientId,
  //     callback: this.handleCredentialResponse.bind(this)
  //   });
    
  //   google.accounts.id.prompt(); 
  // }

  // triggerGoogleSignIn() {
  //   google.accounts.id.prompt((notification: any) => {
  //     if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
  //       // Try manual rendering
  //       google.accounts.id.renderButton(
  //         document.getElementById("googleLoginButton"),
  //         { theme: "outline", size: "large", text: "continue_with" }
  //       );
  //     }
  //   });
  // }
  // handleCredentialResponse(response: any) {
  //   this.auth.googleLogin(response.credential).subscribe(
  //     (res) => {
  //       if (res.isNewUser) {
  //         // Handle new user registration
  //         console.log('New user registered via Google');
  //       } else {
  //         // Handle existing user login
  //         console.log('Existing user logged in via Google');
  //       }
  //         const redirectUrl = '/signup'
  //         const defaultRedirectUrl = '/user';
  
  //         // Use the router's navigateByUrl method to navigate and reload the page
  //         this.router.navigateByUrl(redirectUrl || defaultRedirectUrl).then(() => {
  //           window.location.reload();
  //         });
  //       }
  //     ,
  //     (error) => {
  //       console.error('Google authentication failed', error);
  //       this.avail = true;
  //       this.msg = 'Google authentication failed. Please try again.';
  //     }
  //   );
  // }

  onGoogleSignIn() {
    console.log(this.socialAuthService);  // Check if this is properly instantiated
    // if (this.socialAuthService._initState.isStopped) {
    //   console.error('Login providers not ready yet');
    //   return;
    // }
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      console.log('Google Sign-In successful', user);
      if (user && user.idToken) {
        this.auth.googleSignInUsingFirebase(user.idToken).subscribe(
          (res) => {
            console.log('Google response', res);
          },
          (err) => {
            console.log('Error during Firebase sign-in:', err);
          }
        );
      } else {
        console.error('User or idToken is missing');
      }
    }).catch((error) => {
      console.error('Google sign-in failed:', error);
    });
  }
  
  handleCredentialResponse(response: any) {
    console.log("Response as JSON:", JSON.stringify(response, null, 2));
    
  }

  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: this.latestClientId,
      callback: this.handleCredentialResponse.bind(this)
    });

    google.accounts.id.renderButton(
      document.getElementById('google-sign-in-button'),
      { theme: 'outline', size: 'large' }
    );

    google.accounts.id.prompt(); // Prompt the user to sign in
  }
}  
