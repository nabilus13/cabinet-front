import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MMM-yyyy', this.locale);
    } else {
      return date.toDateString();
    }
  }
}
@Component({
  selector: 'app-dialog-form-component',
  templateUrl: './dialog-form-component.component.html',
  styleUrls: ['./dialog-form-component.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class DialogFormComponentComponent implements OnInit {
  form: FormGroup;
  description: string;
  constructor(
    private dialogRef: MatDialogRef<DialogFormComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {
    this.description = data.title;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      dateReception: new FormControl(new Date(), [
        Validators.required,
        // Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
      ]),
      nombrePlans: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      typeDossier: new FormControl(''),
      client: new FormControl('', [Validators.required]),
      representant: new FormControl(''),
      lieux: new FormControl('', [Validators.required]),
      dateLivraison: new FormControl('', [
        // Validators.required,
        // Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
      ]),
      situation: new FormControl('', [Validators.required]),
      telephone: new FormControl(''),
      prix: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      comission: new FormControl(''),
      totalCaisse: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }
  save() {
    let dateReception = new Date(this.form.get('dateReception')?.value);

    this.form
      .get('dateReception')
      ?.setValue(this.datePipe.transform(dateReception, 'yyyy-MM-dd'));

    if (!!this.form.get('dateLivraison')?.value) {
      console.log('LIVRAOSON');
      let dateLivraison = new Date(this.form.get('dateLivraison')?.value);
      this.form
        .get('dateLivraison')
        ?.setValue(this.datePipe.transform(dateLivraison, 'yyyy-MM-dd'));
    }

    this.dialogRef.close(this.form.value);
    console.log(this.form.value);
  }

  close() {
    let date = new Date(this.form.get('dateReception')?.value);
    const apiDate = this.datePipe.transform(date, 'dd-MM-yyyy');
    const apiDate2 = this.datePipe.transform(date, 'yyyy-MM-dd');
    console.log(date);
    console.log(apiDate);
    console.log(apiDate2);

    const localDate = date.toLocaleDateString();
    console.log(localDate);

    const isoDate = new Date(localDate).toISOString().substring(0, 10);
    console.log(isoDate);
    this.dialogRef.close({ isClosing: true });
  }
}
