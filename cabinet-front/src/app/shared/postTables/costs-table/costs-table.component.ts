import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, NgZone, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChargesItem, ListeChargesItems } from 'src/app/models/charges';

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
  totalTypeCharges = 0;

  loaderEnabled: boolean;

  columnsToDisplay = ['mois', 'charges'];
  innerDisplayedColumns = ['id', 'prix'];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    const tableCharges = localStorage.getItem('tableListCharges');
    this.usersData = JSON.parse(tableCharges ?? '');

    this.dataSource = new MatTableDataSource(Object.entries(this.usersData));
    console.log(this.dataSource?.data);
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

  public getTotalType(element: ChargesItem[]): number {
    return element.reduce((acc, value) => acc + value?.prix, 0);
  }

  getInnerDataSource(
    element: ListeChargesItems
  ): MatTableDataSource<ChargesItem> {
    return new MatTableDataSource(element.charges);
  }
}
