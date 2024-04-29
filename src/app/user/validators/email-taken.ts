import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EmailTaken implements AsyncValidator {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  validate = (control: AbstractControl): Promise<ValidationErrors | null> => {
    return this.auth.fetchSignInMethodsForEmail(control.value).then((res) => {
      console.log(res);
      return res.length ? { emailTaken: true } : null;
    });
  };
}
