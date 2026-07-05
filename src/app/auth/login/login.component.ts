import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = "";
  password = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({

      next: (res: any) => {

  console.log("LOGIN RESPONSE:", res);
  console.log("ROLE:", res.role);

  localStorage.setItem("token", res.token);
  localStorage.setItem("role", res.role);
  localStorage.setItem("fullname", res.fullname);
  localStorage.setItem("userId", res.userId);

  alert("Login Successful!");

  if (res.role === "customer") {
    this.router.navigate(['/home']);
  } else if (res.role === "seller") {
    this.router.navigate(['/seller']);
  } else if (res.role === "admin") {
    this.router.navigate(['/admin']);
  }

},

      error: () => {
        alert("Invalid Email or Password");
      }

    });
  }

}
