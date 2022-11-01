import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss'],
})
export class GeneralTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  constructor(private serviceApi: ApiServiceService) {}
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
    this.serviceApi.apiGetClients().subscribe((res: Client[]) => {
      console.log(res);
    });
  }
  async getData() {
    await this.serviceApi.apiGetClients().subscribe((res: Client[]) => {
      // res = this.data;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(res);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
