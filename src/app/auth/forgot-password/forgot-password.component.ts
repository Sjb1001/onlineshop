  import { Component } from '@angular/core';
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

    constructor(
      private forgotService: ForgotPasswordService
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

    }

  }
