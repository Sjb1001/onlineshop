import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from './state/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'online-selling-app';
  loggedIn = false;
  role = "";
  fullname = "";

  constructor(private router: Router, private store: Store) {

    this.refreshUser();

    this.router.events.subscribe(() => {
      this.refreshUser();
    });

  }

  refreshUser() {

    this.loggedIn = localStorage.getItem("token") != null;

    this.role = localStorage.getItem("role") || "";

    this.fullname = localStorage.getItem("fullname") || "";

  }

  logout() {

    localStorage.clear();
    this.store.dispatch(AuthActions.logout());

    this.router.navigate(['/login']);

  }

}
