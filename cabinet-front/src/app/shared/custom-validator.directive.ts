import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector:
    '[appCustomValidator][ngModel],[appCustomValidator][formControl],[appCustomValidator][formControlName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomValidatorDirective),
      multi: true,
    },
  ],
})
/*Directiva para poder customizar el form del pop up de reglement dossier*/
export class CustomValidatorDirective implements Validator {
  @Input('appCustomValidator') appCustomValidator: number;
  validate(ctrl: AbstractControl): { [key: string]: boolean } | null {
    return ctrl.value > this.appCustomValidator ? { invalidValue: true } : null;
  }
}
