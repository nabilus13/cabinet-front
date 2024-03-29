import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client';
import {
  ExpensesClientInfo,
  ExpensesContentTable,
} from 'src/app/models/expenses-table';
import { monthConst } from 'src/app/models/financial-table';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.scss'],
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
export class ExpensesTableComponent implements OnInit, OnDestroy {
  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<
    MatTable<ExpensesClientInfo>
  >;
  data: Client[] = [];
  dataSource: MatTableDataSource<ExpensesContentTable>;
  expensescontentTable: any[] = [];
  usersData: ExpensesContentTable[] = [];
  loaderEnabled: boolean;

  columnsToDisplay = ['mois', 'dette'];
  innerDisplayedColumns = [
    'dateReception',
    'client',
    'representant',
    'telephone',
    'situation',
    'prix',
    'totalCaisse',
  ];
  expandedElement: ExpensesContentTable | null;
  subscription: Subscription;
  dateDebutReserve = '10-2022';

  constructor(
    private serviceApi: ApiServiceService,
    private cd: ChangeDetectorRef
  ) {
    this.loaderEnabled = true;
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    // this.expensescontentTable[0].clients = [];

    this.subscription = this.serviceApi.apiAllClients.subscribe((res) => {
      if (!!res) {
        this.data = res;
        this.initilizeData(this.data);
        this.loaderEnabled = false;
        this.setDataSource();
      }
    });
  }

  setDataSource() {
    this.usersData = [];
    this.expensescontentTable.forEach((expense) => {
      if (
        expense.clients &&
        Array.isArray(expense.clients) &&
        expense.clients.length
      ) {
        this.usersData = [
          ...this.usersData,
          { ...expense, clients: new MatTableDataSource(expense.clients) },
        ];
      } else {
        this.usersData = [...this.usersData, expense];
      }
    });
    this.dataSource = new MatTableDataSource(this.usersData);
  }
  initilizeData(data: Client[]) {
    const toDate = (str: Date) =>
      new Date(str.toString().replace(/^(\d+)\/(\d+)\/(\d+)$/, '$2/$1/$3'));
    const month = monthConst;
    const mapClients = data.filter((client) => {
      return client?.prix - client?.totalCaisse > 0;
    });

    const entries = Object.entries(mapClients).map(([key, client]) => ({
      mois: this.getFechaActual(toDate(client.dateReception)),
      dateReception: client.dateReception,
      client: client.client,
      representant: client.representant,
      telephone: client.telephone,
      situation: client.situation,
      prix: client.prix,
      totalCaisse: client.totalCaisse,
    }));
    const mapDette = data
      .filter((client) => {
        return client?.prix - client?.totalCaisse > 0;
      })
      .reduce(
        (a, b) => {
          const m = this.getFechaActual(toDate(b.dateReception));
          a[m] = a[m]
            ? +a[m] + b.prix - b.totalCaisse
            : +b.prix - b.totalCaisse;
          return a;
        },
        {} as {
          [index: string]: number;
        }
      );

    this.expensescontentTable = Object.entries(mapDette).map(
      ([key, totalDette]) => ({
        clients: [],
        mois: key,
        dette: this.getMoisDebutReserveDette(key, totalDette),
      })
    );

    this.expensescontentTable.forEach((mois) => {
      entries.forEach((entry, index) => {
        if (mois.mois === entry.mois) {
          mois.clients.push({
            dateReception: entry.dateReception,
            client: entry.client,
            representant: entry.representant,
            telephone: entry.telephone,
            situation: entry.situation,
            prix: entry.prix,
            totalCaisse: entry.totalCaisse,
          });
        }
      });
    });
  }
  getMoisDebutReserveDette(dateFinReserve: string, totalDette: number): number {
    let dateDebutString = `01-${this.dateDebutReserve}`;
    const dateDebut = new Date(
      dateDebutString.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
    );
    let dateFinString = `01-${dateFinReserve}`;
    const date = new Date(
      dateFinString.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
    );

    if (date < dateDebut) {
      return +totalDette.toFixed(0);
    } else {
      return +(totalDette * 0.9).toFixed(0);
    }
  }
  getFechaActual(fecha: Date): string {
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
    return `${mes}-${anio}`;
  }
  toggleRow(element: ExpensesContentTable) {
    element.clients &&
    (element.clients as MatTableDataSource<ExpensesClientInfo>).data.length
      ? (this.expandedElement =
          this.expandedElement === element ? null : element)
      : null;
    this.cd.detectChanges();
    this.innerTables.forEach(
      (table, index) =>
        ((table.dataSource as MatTableDataSource<ExpensesClientInfo>).sort =
          this.innerSort.toArray()[index])
    );
  }
  public getTotalCost(): number {
    return this.usersData
      .map((t) => {
        return Number(t?.dette);
      })
      .reduce((acc, value) => acc + value, 0);
  }
}
function ngOnDestroy() {
  throw new Error('Function not implemented.');
}
