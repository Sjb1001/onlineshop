import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  fullname = "";
  email = "";
  password = "";
  role = "customer";
  securityQuestion = "";
  securityAnswer = "";

  constructor(private store: Store) { }

  register() {
    console.log("Selected role:", this.role);

    const user = {
      fullname: this.fullname,
      email: this.email,
      password: this.password,
      role: this.role,
      securityQuestion: this.securityQuestion,
      securityAnswer: this.securityAnswer
    };

    console.log("Sending user via NgRx:", user);

    this.store.dispatch(AuthActions.register({ userData: user }));
  }
}
