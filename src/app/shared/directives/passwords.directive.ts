import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[passwordValidation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordValidation,
    multi: true
  }]
})
export class PasswordValidation implements Validator {
  validate(control: AbstractControl) : {[key: string]: any} | null {
    const reg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

    if (control.value && !reg.test(control.value)) {
      return { 'passwordInvalid': true };
    }
    return null;
  }
}
