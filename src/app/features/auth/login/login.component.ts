import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  readonly authService = inject(AuthService);
  private router = inject(Router);

  isSignupMode = false;
  showPassword = false;

  // Login Form fields
  loginEmail = 'meera@homehandover.com';
  loginPassword = 'password123';

  // Signup Form fields
  signupName = '';
  signupEmail = '';
  signupPassword = '';
  signupRole: 'Household Admin' | 'Task Creator' | 'Family Member' | 'Guest Access' = 'Family Member';
  signupHouseholdName = 'Sharma Residence';

  errorMessage = '';

  toggleMode(signup: boolean): void {
    this.isSignupMode = signup;
    this.errorMessage = '';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    this.errorMessage = '';
    if (!this.loginEmail.trim()) {
      this.errorMessage = 'Please enter your email address.';
      return;
    }

    const success = this.authService.login(this.loginEmail, this.loginPassword);
    if (success) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSignup(): void {
    this.errorMessage = '';
    if (!this.signupName.trim() || !this.signupEmail.trim() || !this.signupPassword.trim()) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    const success = this.authService.signup(
      this.signupName,
      this.signupEmail,
      this.signupRole,
      this.signupHouseholdName
    );

    if (success) {
      this.router.navigate(['/dashboard']);
    }
  }

  quickDemo(userId: string): void {
    this.authService.quickDemoLogin(userId);
  }
}
