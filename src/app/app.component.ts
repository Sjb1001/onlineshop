import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {

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

    this.router.navigate(['/login']);

  }

}
