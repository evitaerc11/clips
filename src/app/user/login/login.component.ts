import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };

  showAllert = false;
  alertMsg = 'Please wait...';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) {}

  async login() {
    this.showAllert = true;
    this.alertMsg = 'Please wait...';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      this.inSubmission = false;
      this.alertMsg = 'An error occurred. Please try again.';
      this.alertColor = 'red';

      console.log(error);
      return
    }

    this.alertMsg = 'Login successful!';
    this.alertColor = 'green';
    
  }
}
