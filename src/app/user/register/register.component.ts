import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(120),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/g),
    ]),
    confirm_password: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(14),
    ]),
  });

  showAlert = false;
  alertMessage = 'Please wait...';
  alertColor = 'blue';

  register() {
    this.showAlert = true;
    this.alertMessage = 'Please wait...';
    this.alertColor = 'blue';
  }
}
