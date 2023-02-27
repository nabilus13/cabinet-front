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
export class CustomValidatorDirective implements Validator {
  @Input('appCustomValidator') appCustomValidator: number;
  validate(ctrl: AbstractControl): { [key: string]: boolean } | null {
    console.log('PPPPP', ctrl.value);
    console.log(this.appCustomValidator);
    return ctrl.value > this.appCustomValidator ? { invalidValue: true } : null;
  }
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }
}
