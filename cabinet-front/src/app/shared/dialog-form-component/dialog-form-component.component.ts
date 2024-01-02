import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client, ResultDialog, TypeRequest } from 'src/app/models/client';
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
  clientToUpdate: Client;
  isUpdate = false;
  typeInput: string;
  response: ResultDialog = {
    clientData: {
      id: 0,
      client: '',
      lieux:'',
      dateReception: new Date(),
      nombrePlans: 0,
      prix: 0,
      totalCaisse: 0,
    },
    type: TypeRequest.Save,
    isClosing: false,
  };

  constructor(
    private dialogRef: MatDialogRef<DialogFormComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {
    this.description = data.title;
    this.typeInput = data?.type;

    if (!!this.data?.client) {
      this.isUpdate = true;
    }
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
      totalCaisse: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      commentaire: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(254),
      ]),
      // check: new FormControl(false),
    });
    if (!!this.data?.client) {
      this.setValues(this.data.client);
    }
  }
  public getPrix(): number {
    return this.form.get('prix')?.value ? this.form.get('prix')?.value : 0;
  }
  setValues(cl: Client): void {
    cl.dateReception
      ? this.form.get('dateReception')?.setValue(cl.dateReception)
      : this.form.get('dateReception')?.setValue('');
    cl.nombrePlans
      ? this.form.get('nombrePlans')?.setValue(cl.nombrePlans)
      : this.form.get('nombrePlans')?.setValue('');

    cl.dossier
      ? this.form.get('dossier')?.setValue(cl.dossier)
      : this.form.get('dossier')?.setValue('');
    if (this.data && this.data?.type == 'Update') {
      cl.client
        ? this.form.get('client')?.setValue(cl.client)
        : this.form.get('client')?.setValue('');
    } else {
      cl.client
        ? this.form
            .get('client')
            ?.setValue('REG./' + cl.dateReception + '/' + cl.client)
        : this.form.get('client')?.setValue('');
    }
    cl.representant
      ? this.form.get('representant')?.setValue(cl.representant)
      : this.form.get('representant')?.setValue('');

    cl.lieux
      ? this.form.get('lieux')?.setValue(cl.lieux)
      : this.form.get('lieux')?.setValue('');

    cl.dateLivraison
      ? this.form.get('dateLivraison')?.setValue(cl.dateLivraison)
      : this.form.get('dateLivraison')?.setValue('');

    cl.situation
      ? this.form.get('situation')?.setValue(cl.situation)
      : this.form.get('situation')?.setValue('');

    cl.telephone
      ? this.form.get('telephone')?.setValue(cl.telephone)
      : this.form.get('telephone')?.setValue('');

    if (this.data && this.data?.type == 'Update') {
      cl.prix
        ? this.form.get('prix')?.setValue(cl.prix)
        : this.form.get('prix')?.setValue('');
    } else {
      cl.prix
        ? this.form.get('prix')?.setValue(cl.prix - cl.totalCaisse)
        : this.form.get('prix')?.setValue('');
    }

    cl.comission
      ? this.form.get('comission')?.setValue(cl.comission)
      : this.form.get('comission')?.setValue('');

    if (this.data && this.data?.type == 'Update') {
      cl.totalCaisse
        ? this.form.get('totalCaisse')?.setValue(cl.totalCaisse)
        : this.form.get('totalCaisse')?.setValue('');
    } else {
      this.form.get('totalCaisse')?.setValue('');
    }

    cl.commentaire
      ? this.form.get('commentaire')?.setValue(cl.commentaire)
      : this.form.get('commentaire')?.setValue('');

    this.form.valueChanges.subscribe((value) => {
      this.clientToUpdate = value;
    });
  }
  save() {
    let dateReception = new Date(this.form.get('dateReception')?.value);

    this.form
      .get('dateReception')
      ?.setValue(this.datePipe.transform(dateReception, 'yyyy-MM-dd'));

    if (this.form.get('dateLivraison')?.value) {
      let dateLivraison = new Date(this.form.get('dateLivraison')?.value);
      this.form
        .get('dateLivraison')
        ?.setValue(this.datePipe.transform(dateLivraison, 'yyyy-MM-dd'));
    }
    this.response.clientData = this.form.value;
    this.response.type = TypeRequest.Save;

    this.dialogRef.close(this.response);
  }
  update() {
    let dateReception = new Date(this.form.get('dateReception')?.value);

    this.form
      .get('dateReception')
      ?.setValue(this.datePipe.transform(dateReception, 'yyyy-MM-dd'));

    if (this.form.get('dateLivraison')?.value) {
      let dateLivraison = new Date(this.form.get('dateLivraison')?.value);
      this.form
        .get('dateLivraison')
        ?.setValue(this.datePipe.transform(dateLivraison, 'yyyy-MM-dd'));
    }

    this.clientToUpdate.id = this.data?.id;
    this.response.clientData = this.clientToUpdate;
    if (this.data && this.data?.type == 'Update') {
      this.response.type = TypeRequest.Update;
    } else {
      this.response.type = TypeRequest.Reglement;
    }
    this.dialogRef.close(this.response);
  }

  close() {
    let date = new Date(this.form.get('dateReception')?.value);
    const apiDate = this.datePipe.transform(date, 'dd-MM-yyyy');
    const apiDate2 = this.datePipe.transform(date, 'yyyy-MM-dd');

    const localDate = date.toLocaleDateString();
    this.response.type = TypeRequest.Close;

    this.response.isClosing = true;

    this.dialogRef.close(this.response);
  }
}
