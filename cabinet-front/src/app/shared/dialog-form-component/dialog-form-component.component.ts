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
      totalCaisse: new FormControl('', [
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
  setValues(cl: Client) {
    cl.dateReception
      ? this.form.get('dateReception')?.setValue(cl.dateReception)
      : '';
    cl.nombrePlans
      ? this.form.get('nombrePlans')?.setValue(cl.nombrePlans)
      : '';
    cl.dossier ? this.form.get('dossier')?.setValue(cl.dossier) : '';
    if (this.data && this.data?.type == 'Update') {
      cl.client ? this.form.get('client')?.setValue(cl.client) : '';
    } else {
      cl.client
        ? this.form
            .get('client')
            ?.setValue('REG./' + cl.dateReception + '/' + cl.client)
        : '';
    }
    cl.representant
      ? this.form.get('representant')?.setValue(cl.representant)
      : '';
    cl.lieux ? this.form.get('lieux')?.setValue(cl.lieux) : '';
    cl.dateLivraison
      ? this.form.get('dateLivraison')?.setValue(cl.dateLivraison)
      : '';
    cl.situation ? this.form.get('situation')?.setValue(cl.situation) : '';
    cl.telephone ? this.form.get('telephone')?.setValue(cl.telephone) : '';
    if (this.data && this.data?.type == 'Update') {
      cl.prix ? this.form.get('prix')?.setValue(cl.prix) : '';
    } else {
      cl.prix ? this.form.get('prix')?.setValue(cl.totalCaisse) : '';
    }

    cl.comission ? this.form.get('comission')?.setValue(cl.comission) : '';
    if (this.data && this.data?.type == 'Update') {
      cl.totalCaisse
        ? this.form.get('totalCaisse')?.setValue(cl.totalCaisse)
        : '';
    } else {
      this.form.get('totalCaisse')?.setValue('');
    }

    cl.commentaire
      ? this.form.get('commentaire')?.setValue(cl.commentaire)
      : '';

    this.form.valueChanges.subscribe((value) => {
      this.clientToUpdate = value;
    });
  }
  save() {
    let dateReception = new Date(this.form.get('dateReception')?.value);

    this.form
      .get('dateReception')
      ?.setValue(this.datePipe.transform(dateReception, 'yyyy-MM-dd'));

    if (!!this.form.get('dateLivraison')?.value) {
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

    if (!!this.form.get('dateLivraison')?.value) {
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

    // const isoDate = new Date(localDate).toISOString().substring(0, 10);
    // console.log(isoDate);
    // this.dialogRef.close({ isClosing: true });
  }
}
