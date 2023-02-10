import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DialogFormComponentComponent } from '../../dialog-form-component/dialog-form-component.component';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss'],
})
export class GeneralTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('pop')
  pop: TemplateRef<any>;
  modalRef: BsModalRef;

  dataSource: MatTableDataSource<any>;
  subscription: Subscription;
  showModal = false;
  newClient: Client;
  title = 'CLient';
  constructor(
    private serviceApi: ApiServiceService,
    private dialog: MatDialog,
    private readonly modalService: BsModalService
  ) {}
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.getData();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  displayedColumns: string[] = [
    'id',
    'dateReception',
    'nombrePlans',
    'dossier',
    'client',
    'representant',
    'lieux',
    'dateLivraison',
    'situation',
    'telephone',
    'prix',
    'comission',
    'totalCaisse',
  ];

  data: any[] = [];
  ngOnInit(): void {
    // this.getData();
    // this.serviceApi.apiGetClients().subscribe((res: Client[]) => {
    //   console.log(res);
    // });
  }
  openModal() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.width = '800px';
    dialogConfig.data = {
      id: 1,
      title: 'Saisir les données du client',
    };

    const dialogRef = this.dialog.open(
      DialogFormComponentComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result); //returns undefined
      if (result && !result.isClosing) {
        this.serviceApi.apiSaveClient(result).subscribe((res) => {
          if (res?.status == 201) {
            this.serviceApi.cacheInitialized = false;
            this.getData();
          }
        });
      }
    });
  }
  async getData() {
    this.subscription = await this.serviceApi.apiAllClients.subscribe(
      (res: Client[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(client: any) {
    console.log(client?.id);
  }

  onDelete(client: Client) {
    // const deleteAll = confirm(
    //   'Attention ! Êtes-vous sûr de vouloir supprimer le client suivant ?'
    // );
    this.newClient = client;
    const initialState = {
      data: client,
    };
    this.modalRef = this.modalService.show(this.pop, { initialState });
    // this.modalRef.content.data = client;

    console.log(client?.id);
  }
  receiveonCloseStep(idClient: number) {
    this.serviceApi.deleteClient(idClient).subscribe((res) => {
      this.serviceApi.cacheInitialized = false;
      this.getData();
      this.modalRef.hide();
    });
  }
  /**
   * Méthode pour montrer poop-up
   */
  validatePopUp(): void {
    // if (this.accepterCgu) {
    this.modalRef = this.modalService.show(this.pop);
    // }
  }
}
