import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  Charges,
  Charges2,
  ChargesExport,
  ChargesImport,
  ChargesItem,
  ListeChargesItems,
  TypeCharges,
} from 'src/app/models/charges';
import { ApiChargesServices } from 'src/app/services/api-charges.service';

@Component({
  selector: 'app-costs-table',
  templateUrl: './costs-table.component.html',
  styleUrls: ['./costs-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CostsTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  usersData: ListeChargesItems[] = [];
  expandedElement: ListeChargesItems | null;
  expandedInnerElement: ChargesItem | null;
  totalTypeCharges = 0;

  loaderEnabled: boolean;
  rows: ChargesExport[] = [];
  displayedImportColumns = [
    'date_paiement',
    'description',
    'prix',
    'type',
    'ActionClient',
  ];
  dataChargesImport: ChargesImport[] = [];
  dataCharges: Charges[] = [];
  elementBeingEdited: any;
  tiposDisponibles: TypeCharges[] = [];

  csvData: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  columnsToDisplay = ['mois', 'charges'];
  innerDisplayedColumns = ['id', 'prix'];
  innerSecondDisplayedColumns = ['date_Paiement', 'description', 'prix'];

  constructor(
    private ngZone: NgZone,
    private apiServiceCharges: ApiChargesServices
  ) {}

  ngOnInit(): void {
    this.apiServiceCharges.apiTypeAllCharges.subscribe((res) => {
      this.tiposDisponibles = res;
      console.log('TYPE', res);
    });
    this.apiServiceCharges.apiAllCharges.subscribe((res) => {
      this.dataCharges = res;
      console.log('Charge', this.dataCharges);
    });
    const tableCharges = localStorage.getItem('tableListCharges');
    this.usersData = JSON.parse(tableCharges ?? '');

    this.dataSource = new MatTableDataSource(Object.entries(this.usersData));
    this.totalTypeCharges = this.dataSource?.data.reduce(
      (acc, element) => acc + this.getTotalType(element[1]),
      0
    );
  }

  public getTotalCost(): number {
    return this.totalTypeCharges;
  }

  toggleRow(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }
  toggleInnerRow(subElement: any) {
    this.expandedInnerElement =
      this.expandedInnerElement === subElement ? null : subElement;
  }

  public getTotalType(element: ChargesItem[]): number {
    return +element.reduce((acc, value) => acc + value?.prix, 0).toFixed(2);
  }

  getInnerDataSource(
    element: ListeChargesItems
  ): MatTableDataSource<ChargesItem> {
    return new MatTableDataSource(element.charges);
  }
  addRow() {
    const newRow: ChargesExport = {
      date: '',
      description: '',
      prix: 0,
      type: '',
    };
    this.rows.push(newRow);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.parseCsv(file);
    }
  }

  parseCsv(file: File): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      const lines = content.split('\n');
      const headers = lines[0].split(',').map((header) => header.trim()); // Limpiar nombres de columna

      this.displayedColumns = headers;
      const data = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map((value) => value.trim()); // Limpiar valores

        if (values.length === headers.length) {
          // Asegurarse de que coincidan las columnas y los valores
          const row: ChargesImport = {
            id: Math.random().toString(36).substr(2, 9),
            date_paiement: '',
            description: '',
            prix: '',
          };

          for (let j = 0; j < headers.length; j++) {
            row[headers[j] as keyof ChargesImport] = values[j] as any;
          }

          data.push(row);
          this.dataChargesImport.push(row);
        }
      }

      this.csvData = new MatTableDataSource(data);
      this.csvData.sort = this.sort;
      console.log(data, this.csvData);
    };

    reader.readAsText(file);
  }

  editRecord(element: any, index: number) {
    console.log(index, element);
    this.elementBeingEdited = element;
  }
  // Luego, implementa una función para guardar los cambios
  saveEditedRecord() {
    if (this.elementBeingEdited) {
      console.log(this.csvData.data);
      this.elementBeingEdited = null;
    }
  }
  saveDataToBackend() {
    const tipoMappings: { [id: number]: TypeCharges } = {};
    const chargesMapeados: Charges2[] = [];

    this.tiposDisponibles.forEach((tipo) => {
      tipoMappings[tipo.id] = tipo;
    });

    // Iterar sobre los datos y realizar la transformación
    for (let i = 0; i < this.csvData.data.length; i++) {
      const elemento = this.csvData.data[i];

      // Convertir el campo 'type' a un número si es una cadena
      elemento.type = parseInt(elemento.type, 10);

      // Verificar si el campo 'type' está en el mapa
      if (elemento.type in tipoMappings) {
        const charges: Charges2 = {
          datePaiement: (elemento.date_paiement),
          description: elemento.description,
          prix: parseFloat(elemento.prix),
          type: tipoMappings[elemento.type],
        };

        chargesMapeados.push(charges);
      } else {
        // Si no se encuentra en el mapa, puedes manejarlo de acuerdo a tus necesidades
        // Por ejemplo, asignar un valor predeterminado o lanzar un error
        // elemento.type = valorPredeterminado;
      }
    }
    console.log(chargesMapeados);
    this.apiServiceCharges.apisaveAllCharges(chargesMapeados).subscribe((res)=>{
console.log(res)
    })
  }

  addType() {
    this.dataChargesImport.forEach((item, index) => {
      const tipoMasProbable = this.calcularTipoMasProbable(
        this.dataCharges,
        item?.description
      );
      if (tipoMasProbable !== null) {
        this.csvData.data[index].type = tipoMasProbable; // Suponiendo que csvData tenga una propiedad para almacenar el tipo más probable
      }
    });
  }

  calcularTipoMasProbable(
    datosConsulta: Charges[],
    descripcion: string
  ): number | null {
    // Crear un objeto para contar las frecuencias de cada tipo
    const foundCharge = datosConsulta.find(
      (charge) => charge.description === descripcion
    );

    // Si se encontró una coincidencia, devuelve el type.id, de lo contrario, devuelve 0
    return foundCharge ? foundCharge.type.id : 0;
  }
}
