import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client';
import {
  ContentFinantialTable,
  monthConst,
} from 'src/app/models/financial-table';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-financial-table',
  templateUrl: './financial-table.component.html',
  styleUrls: ['./financial-table.component.scss'],
})
export class FinancialTableComponent implements OnInit, OnDestroy {
  loaderEnabled: boolean;
  subscription: Subscription;

  dataSource: any[] = [];
  charges: any[] = [];
  displayedColumns: string[] = [
    'mois',
    'prix',
    'totalCaisse',
    'comission',
    'charges',
    'profitReel',
    'profitTheorique',
  ];
  data: Client[] = [];
  finantialContentTable: ContentFinantialTable[];
  tableFooterColumns: string[] = ['total'];

  constructor(private apiServiceService: ApiServiceService) {
    this.loaderEnabled = true;
  }
  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.apiServiceService.getExpenses().subscribe((res) => {
      this.charges = res;
    });
    this.subscription = this.apiServiceService.apiAllClients.subscribe(
      (res) => {
        if (!!res && this.charges.length > 0) {
          this.data = res;
          this.initilizeData(this.data);
          this.loaderEnabled = false;
        }
      }
    );
  }

  initilizeData(data: Client[]) {
    const toDate = (str: Date) =>
      new Date(str.toString().replace(/^(\d+)\/(\d+)\/(\d+)$/, '$2/$1/$3'));
    const month = monthConst;
    const mapPrix = data.reduce(
      (a, b) => {
        const m = toDate(b.dateReception).getMonth();
        a[m] = a[m] ? +a[m] + b.prix : +b.prix;
        return a;
      },
      {} as {
        [index: number]: number;
      }
    );
    const mapTotalCaisse = data.reduce(
      (a, b) => {
        const m = toDate(b.dateReception).getMonth();
        a[m] = a[m] ? +a[m] + b.totalCaisse : +b.totalCaisse;
        return a;
      },
      {} as {
        [index: number]: number;
      }
    );
    console.log(mapTotalCaisse);

    const mapComission = data.reduce(
      (a, b) => {
        const m = toDate(b.dateReception).getMonth();
        if (!!b?.comission) {
          a[m] = a[m] ? +a[m] + b?.comission : +b.comission;
        }
        return a;
      },
      {} as {
        [index: number]: number;
      }
    );

    this.finantialContentTable = Object.entries(mapPrix).map(
      ([key, prix], index) => ({
        prix,
        totalCaisse: mapTotalCaisse[+key],
        comission: mapComission[+key],
        mois: month[+key],
        charges: this.charges[index]?.totalExpenses,
        profitReel:
          mapTotalCaisse[+key] -
          this.charges[index]?.totalExpenses -
          mapComission[+key],
        profitTheorique:
          prix - this.charges[index]?.totalExpenses - mapComission[+key],
      })
    );
    this.dataSource = this.finantialContentTable;
  }
  public getTotalCost(element: string): number {
    switch (element) {
      case 'prix':
        return this.finantialContentTable
          .map((t) => {
            return Number(t?.prix);
          })
          .reduce((acc, value) => acc + value, 0);
      case 'comission':
        return this.finantialContentTable
          .map((t) => {
            return Number(t?.comission);
          })
          .reduce((acc, value) => acc + value, 0);
      case 'totalCaisse':
        return this.finantialContentTable
          .map((t) => {
            return Number(t?.totalCaisse);
          })
          .reduce((acc, value) => acc + value, 0);
      case 'charges':
        return this.finantialContentTable
          .map((t) => {
            return Number(t?.charges);
          })
          .reduce((acc, value) => acc + value, 0);
      case 'profitReel':
        return this.finantialContentTable
          .map((t) => {
            return Number(t?.profitReel);
          })
          .reduce((acc, value) => acc + value, 0);
      case 'profitTheorique':
        return this.finantialContentTable
          .map((t) => {
            return Number(t?.profitTheorique);
          })
          .reduce((acc, value) => acc + value, 0);
      default:
        return 0;
    }
  }
}
function finalize(
  arg0: (data: any) => void
): import('rxjs').OperatorFunction<Client[], unknown> {
  throw new Error('Function not implemented.');
}
