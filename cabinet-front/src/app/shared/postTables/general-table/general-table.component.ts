import {
  AfterViewInit,
  ChangeDetectorRef,
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
import {
  Client,
  ClientDto,
  ResultDialog,
  TypeRequest,
} from 'src/app/models/client';
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
  clientCsvData: MatTableDataSource<any>;
  subscription: Subscription;
  showModal = false;
  newClient: Client;

  // Representa el objeto cliente que se está editando
  elementBeingEdited: any = null;

  // Representa el nombre del campo del objeto cliente que se está editando
  editingField: string | null = null;

  title = 'CLient';
  dataClientsImport: ClientDto[] = [];
  constructor(
    private serviceApi: ApiServiceService,
    private dialog: MatDialog,
    private readonly modalService: BsModalService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    this.getData();
    //to avoid de ng1000 error detection change
    this.cd.detectChanges();
  }
  displayedColumnsCsv: string[] = [];

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
          });
      } else {
        if (
          result.type === TypeRequest.Reglement &&
          !result.isClosing &&
          !!result.clientData
        ) {
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

  onDelete(client: Client) {
    this.newClient = client;
    const initialState = {
      data: client,
    };
    this.modalRef = this.modalService.show(this.pop, { initialState });
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
  /////////////////////////////////////Tab_2////////////////////////////////////////
  addClientRow() {
    // Implementar la lógica para añadir una nueva fila
  }

  onClientFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.parseClientCsv(file);
    }
  }

  parseClientCsv(file: File): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      const lines = content.split('\n');
      const headers = lines[0].split(',').map((header) => header.trim()); // Limpiar nombres de columna

      this.displayedColumnsCsv = headers;
      const data = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map((value) => value.trim()); // Limpiar valores

        if (values.length === headers.length) {
          // Asegurarse de que coincidan las columnas y los valores
          const row: ClientDto = {
            id: i.toString(),
            date_reception: this.getFormatDate(),
            nombre_plans: '',
            dossier: '',
            client: '',
            representant: '',
            situation: '',
            lieux: '',
            date_livraison: this.getFormatDate(),
            telephone: '',
            prix: '',
            comission: '',
            total_caisse: '',
            commentaire: '',
          };

          for (let j = 0; j < headers.length; j++) {
            row[headers[j] as keyof ClientDto] = values[j] as any;
          }

          data.push(row);
          this.dataClientsImport.push(row);
        }
      }

      this.clientCsvData = new MatTableDataSource(data);
      this.clientCsvData.sort = this.sort;
      console.log(data, this.clientCsvData);
    };

    reader.readAsText(file);
  }

  getFormatDate(): string {
    // Crear un objeto Date (la fecha actual, por ejemplo)
    const miFecha = new Date();

    // Obtener el año, mes y día
    let year = miFecha.getFullYear();
    let month = miFecha.getMonth() + 1; // getMonth() devuelve un valor de 0 a 11
    let day = miFecha.getDate();

    // Asegurarse de que el mes y el día tengan dos dígitos
    const monthString = month < 10 ? '0' + month.toString() : month.toString();
    const dayString = day < 10 ? '0' + day.toString() : day.toString();

    // Formatear la fecha en formato YYYY-MM-DD
    return year.toString() + '-' + monthString + '-' + dayString;
  }
  saveClientDataToBackend() {
    const clients: Client[] = [];

    for (const element of this.clientCsvData.data) {
      const elemento = element;

      const client: Client = {
        id: parseInt(elemento.id),
        dateReception: elemento.date_reception,
        nombrePlans: parseInt(elemento.nombre_plans),
        dossier: elemento.dossier,
        client: elemento.client,
        representant: elemento.representant,
        lieux: elemento.lieux,
        dateLivraison: elemento.date_livraison,
        situation: elemento.situation,
        telephone: parseInt(elemento.telephone),
        prix: parseFloat(elemento.prix),
        comission: parseFloat(elemento.comission),
        totalCaisse: parseFloat(elemento.total_caisse),
      };
      clients.push(client);
    }
    console.log(clients);
    // this.serviceApi.apiSaveAllClient(clients).subscribe((res) => {
    //   console.log(res);
    // });
  }

  saveEditedClientRecord() {
    if (this.elementBeingEdited) {
      // Aquí iría la lógica para validar y procesar los cambios
      // Por ejemplo, enviar el elemento editado al backend para su actualización
      // this.apiService.updateClient(this.elementBeingEdited).subscribe({
      //   next: (res) => {
      //     console.log('Datos del cliente actualizados con éxito', res);
      //     // Restablecer elementBeingEdited a null después de guardar
      //     this.elementBeingEdited = null;
      //   },
      //   error: (err) => {
      //     console.error('Error al actualizar los datos del cliente', err);
      //   }
      // });
    }
  }
}
