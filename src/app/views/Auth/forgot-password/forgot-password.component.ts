import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form with validation rules
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email] // Email must be valid and required
      ]
    });
  }

  // Convenience getter for easy access to form controls in the template
  get f() {
    return this.forgotPasswordForm.controls;
  }

  // Function to handle form submission
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const { email } = this.forgotPasswordForm.value;
      console.log('Email:', email);
      alert(`A password reset link has been sent to: ${email}`);
      // Call your API here to send the password reset email
    } else {
      console.log('Form is invalid');
    }
  }
}
