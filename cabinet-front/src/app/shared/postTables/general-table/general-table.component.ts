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
import { Client, ResultDialog, TypeRequest } from 'src/app/models/client';
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
    'ActionClient',
  ];

  data: any[] = [];
  ngOnInit(): void {
    // this.getData();
    // this.serviceApi.apiGetClients().subscribe((res: Client[]) => {
    //   console.log(res);
    // });
  }
  openModal(client?: Client, type?: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '800px';
    dialogConfig.data = {
      id: client?.id,
      title: 'Saisir les données du client',
      client: client,
      type: type,
    };

    const dialogRef = this.dialog.open(
      DialogFormComponentComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result: ResultDialog) => {
      if (
        result.type === TypeRequest.Save &&
        !result.isClosing &&
        !!result.clientData
      ) {
        this.serviceApi.apiSaveClient(result.clientData).subscribe((res) => {
          if (res?.status == 201) {
            this.serviceApi.cacheInitialized = false;
            this.getData();
          }
        });
      } else if (
        result.type === TypeRequest.Update &&
        !result.isClosing &&
        !!result.clientData
      ) {
        this.serviceApi
          .updateClient(result.clientData, result.clientData?.id)
          .subscribe((res) => {
            this.serviceApi.cacheInitialized = false;
            this.getData();
            console.log(res);
          });
      } else {
        if (
          result.type === TypeRequest.Reglement &&
          !result.isClosing &&
          !!result.clientData
        ) {
          console.log(result);
          let clientToSave: any = {};
          clientToSave.totalCaisse = result.clientData.totalCaisse;
          clientToSave.commentaire = result.clientData.commentaire;
          clientToSave.dateLivraison = result.clientData.dateLivraison;
          clientToSave.dateReception = result.clientData.dateReception;
          clientToSave.dossier = result.clientData.dossier;
          clientToSave.lieux = result.clientData.lieux;
          clientToSave.nombrePlans = result.clientData.nombrePlans;
          clientToSave.prix = result.clientData.totalCaisse;
          clientToSave.representant = result.clientData.representant;
          clientToSave.situation = 'Livré';
          clientToSave.telephone = result.clientData.telephone;
          clientToSave.totalCaisse = result.clientData.totalCaisse;
          clientToSave.client = result.clientData.client;

          let clientToupdate = this.getUpdatedClient(result.clientData);
          this.serviceApi
            .updateClient(clientToupdate, clientToupdate?.id)
            .subscribe((res) => {
              if (res?.status == 200) {
                this.serviceApi.apiSaveClient(clientToSave).subscribe((res) => {
                  if (res?.status == 201) {
                    this.serviceApi.cacheInitialized = false;
                    this.getData();
                  }
                });
              }
            });
        }
      }
    });
  }
  getUpdatedClient(client: Client): Client {
    let clienToUpdate: Client;
    let oldClient: Client = this.dataSource.data.find(
      (cl) => cl.id === client.id
    );
    clienToUpdate = oldClient;
    clienToUpdate = {
      ...clienToUpdate,
      prix: oldClient?.prix - client.totalCaisse,
      situation:
        oldClient?.prix - oldClient?.totalCaisse - client?.totalCaisse == 0
          ? 'Livré'
          : oldClient?.situation,
    };

    return clienToUpdate;
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
    this.newClient = client;
    const initialState = {
      data: client,
    };
    this.modalRef = this.modalService.show(this.pop, { initialState });

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
