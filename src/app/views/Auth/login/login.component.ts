import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
  }

}
