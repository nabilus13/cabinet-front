import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss'],
})
export class DialogConfirmationComponent implements OnInit {
  @Input() modalRef: BsModalRef;

  @Input() newClient: Client;
  @Output() confirmEvent = new EventEmitter<number>();

  public data: Client;

  constructor(public bsModalRef: BsModalRef) {
    this.data = this.bsModalRef.content;
  }

  ngOnInit(): void {
    console.log(this.newClient);
  }

  closePopUP() {
    this.confirmEvent.emit(this.newClient.id);
  }
  close() {
    this.modalRef.hide();
  }
}
