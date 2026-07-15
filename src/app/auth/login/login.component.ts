import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = "";
  password = "";

  // The Router and AuthService injections are removed here
  // because NgRx Effects handles them now.
  constructor(private store: Store) {}

  login() {
    if (!this.email || !this.password) {
      alert("Please enter both email and password.");
      return;
    }

    // Sends the action to the NgRx store to handle the login process
    this.store.dispatch(AuthActions.login({
      credentials: {
        email: this.email,
        password: this.password
      }
    }));
  }
}
