import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  checkPasswordValid: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password')?.value;
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{6,}/;
    if (password) {
      if (passwordRegex.test(password)) {
        return null;
      } else {
        return { passwordsNotValid: true, };
      }
    } else {
      return null;
    };
  }

  checkPasswordsMatching: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('rePassword')?.value
    return password === confirmPassword ? null : { passwordsNotMatching: true }
  }

  checkFile: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    return group.get('comercialRegistrationNumber')?.value ? null : { fileIsRequired: true }
  }

}
