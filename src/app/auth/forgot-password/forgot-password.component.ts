  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import { ForgotPasswordService } from '../../services/forgot-password.service';

  @Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
  })
  export class ForgotPasswordComponent {

    step = 1;

    email = "";

    securityQuestion = "";

    securityAnswer = "";

    newPassword = "";

    confirmPassword = ""; // Track confirm password input

    constructor(
      private forgotService: ForgotPasswordService, private router: Router
    ) {}

    getQuestion() {

      console.log("Next button clicked");

      this.forgotService.getQuestion(this.email).subscribe({

        next: (data: any) => {

          console.log(data);

          this.securityQuestion = data.question;

          this.step = 2;

        },

        error: (err) => {

          console.log(err);

          alert(err.error.message);

        }

      });

    }

    verifyAnswer() {

      console.log("Verify button clicked");


    this.forgotService.verifyAnswer({

      email: this.email,

      answer: this.securityAnswer

    }).subscribe({

      next: () => {

        this.step = 3;

      },

      error: (err) => {

        alert(err.error.message);

      }

    });

  }

    resetPassword() {
    console.log("Change Password button clicked");

    // Check if fields are empty
    if (!this.newPassword || !this.confirmPassword) {
      alert("Please fill out both password fields.");
      return;
    }

    // Check if passwords match
    if (this.newPassword !== this.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Send payload to your Node/Express server targeting MongoDB
    this.forgotService.resetPassword({
      email: this.email,
      newPassword: this.newPassword
    }).subscribe({
      next: (res: any) => {
        alert("Password changed successfully!");

        // Reset the form values
        this.newPassword = "";
        this.confirmPassword = "";
        this.email = "";
        this.securityAnswer = "";
        this.step = 1;

        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        alert(err.error?.message || "An error occurred while resetting your password.");
      }
    });

  }
}
