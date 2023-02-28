import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('rePassword')?.value
    return password === confirmPassword ? null : { passwordsNotMatching: true }
  }

  checkFile: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    return group.get('registrationNumber')?.value ? null : { fileIsRequired: true }
  }

}
