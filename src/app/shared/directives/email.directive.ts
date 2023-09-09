import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[emailValidation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailValidation,
    multi: true
  }]
})
export class EmailValidation implements Validator {
  validate(control: AbstractControl) : {[key: string]: any} | null {
    const reg = new RegExp(/^[A-Za-z0-9._+\-\']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/);

    if (control.value && !reg.test(control.value)) {
      return { 'emailInvalid': true };
    }
    return null;
  }
}
