import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register() {

  console.log("Selected role:", this.role);

  const user = {
    fullname: this.fullname,
    email: this.email,
    password: this.password,
    role: this.role
  };

  console.log("Sending user:", user);

  this.authService.register(user).subscribe({
    next: () => {
      alert("Registration Successful!");
      this.router.navigate(['/login']);
    },

    error: (err) => {
      console.log(err);
      console.log(err.error);
      alert(err.error.message);
    }
  });

}
}
