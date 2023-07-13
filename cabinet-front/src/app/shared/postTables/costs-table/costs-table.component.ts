import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, NgZone, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  ChargesExport,
  ChargesItem,
  ListeChargesItems,
} from 'src/app/models/charges';

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
  dataSource: MatTableDataSource<any>;
  usersData: ListeChargesItems[] = [];
  expandedElement: ListeChargesItems | null;
  expandedInnerElement: ChargesItem | null;
  totalTypeCharges = 0;

  loaderEnabled: boolean;
  rows: ChargesExport[] = [];

  columnsToDisplay = ['mois', 'charges'];
  innerDisplayedColumns = ['id', 'prix'];
  innerSecondDisplayedColumns = ['date_Paiement', 'description', 'prix'];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
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
}
