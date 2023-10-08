import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client';
import {
  ContentFinantialTable,
  monthConst,
} from 'src/app/models/financial-table';
import { ApiChargesServices } from 'src/app/services/api-charges.service';
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
  dateDebutReserve = '10-2022';
  displayedColumns: string[] = [
    'mois',
    'prix',
    'totalCaisse',
    'comission',
    'charges',
    'reserveCaisse10prct',
    'profitReel',
    'profitReelPersonne',
    'profitTheorique',
  ];
  data: Client[] = [];
  finantialContentTable: ContentFinantialTable[];
  tableFooterColumns: string[] = ['total'];
  profitReelDeficit: number = 0;
  totalSavings = 0;

  constructor(
    private apiServiceService: ApiServiceService,
    private apiServiceCharges: ApiChargesServices
  ) {
    this.loaderEnabled = true;
  }
  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    const tableCharges = localStorage.getItem('tableCharges');
    this.charges = JSON.parse(tableCharges ?? '');

    this.subscription = this.apiServiceService.apiAllClients.subscribe(
      (res) => {
        if (!!res && this.charges.length > 0) {
          this.data = res;
          this.initilizeData(this.data);
          this.loaderEnabled = false;
          this.adjustNegativeProfitsWithSavingsAndPrecedentProfits();
          console.log(this.totalSavings);
        }
      }
    );
  }

  adjustNegativeProfitsWithSavingsAndPrecedentProfits() {
    // this.totalSavings = this.finantialContentTable
    //   .map((m) => {
    //     return +(m.reserveCaisse10prct ?? 0).toFixed(0);
    //   })
    //   .reduce((acc, value) => acc + value, 0);
    
    this.finantialContentTable.forEach((item, index) => {
      this.totalSavings += +(item.reserveCaisse10prct ?? 0).toFixed(0);
      if (!!item?.profitReel && item?.profitReel < 0) {
        if (this.totalSavings + item?.profitReel > 0) {
          this.totalSavings += item?.profitReel;
    console.log(this.totalSavings);

          this.finantialContentTable[index] = {
            ...this.finantialContentTable[index],
            profitReel: 0,
            profitReelPersonne: 0,
            profitTheorique: 0,
          };
        } else {
    console.log(this.totalSavings);

          const profitReel =
            (this.finantialContentTable[index]?.profitReel ?? 0) +
            this.totalSavings;

          const profitTheorique =
            (this.finantialContentTable[index]?.profitTheorique ?? 0) +
            this.totalSavings;

          console.log(profitReel);
          console.log(this.finantialContentTable[index - 1]?.profitReel);

          this.finantialContentTable[index] = {
            ...this.finantialContentTable[index],
            profitReel: this.returnValueProfits(
              this.totalSavings,
              this.finantialContentTable[index]?.profitReel ?? 0,
              this.finantialContentTable[index - 1]?.profitReel ?? 0
            ),
            profitReelPersonne: this.returnValueProfits(
              +(this.totalSavings / 3).toFixed(0),
              this.finantialContentTable[index]?.profitReelPersonne ?? 0,
              this.finantialContentTable[index - 1]?.profitReelPersonne ?? 0
            ),
            profitTheorique: this.returnValueProfits(
              this.totalSavings,
              this.finantialContentTable[index]?.profitTheorique ?? 0,
              this.finantialContentTable[index - 1]?.profitTheorique ?? 0
            ),
          };
          this.finantialContentTable[index - 1] = {
            ...this.finantialContentTable[index - 1],
            profitReel:
              (profitReel ?? 0) +
              (this.finantialContentTable[index - 1]?.profitReel ?? 0),
            profitReelPersonne:
              +(profitReel / 3).toFixed(0) +
              (this.finantialContentTable[index - 1]?.profitReelPersonne ?? 0),
            profitTheorique:
              (profitTheorique ?? 0) +
              (this.finantialContentTable[index - 1]?.profitTheorique ?? 0),
          };
          this.totalSavings = 0;
        }
      }
    });
    console.log(this.finantialContentTable);
  }

  returnValueProfits(
    savings: number,
    item: number,
    precedentItem: number
  ): number {
    const result = savings + item + precedentItem;
    return result > 0 ? 0 : result;
  }
  initilizeData(data: Client[]) {
    const toDate = (str: Date) =>
      new Date(str.toString().replace(/^(\d+)\/(\d+)\/(\d+)$/, '$2/$1/$3'));
    const month = monthConst;
    const mapPrix = data.reduce(
      (a, b) => {
        const m = this.getFechaActual(toDate(b.dateReception));
        a[m] = a[m] ? +a[m] + b.prix : +b.prix;
        return a;
      },
      {} as {
        [index: string]: number;
      }
    );
    const mapTotalCaisse = data.reduce(
      (a, b) => {
        const m = this.getFechaActual(toDate(b.dateReception));
        a[m] = a[m] ? +a[m] + b.totalCaisse : +b.totalCaisse;
        return a;
      },
      {} as {
        [index: string]: number;
      }
    );
    const mapComission = data.reduce(
      (a, b) => {
        const m = this.getFechaActual(toDate(b.dateReception));
        // toDate(b.dateReception).getMonth() +
        // '-' +
        // toDate(b.dateReception).getFullYear;
        if (!!b?.comission) {
          a[m] = a[m] ? +a[m] + b?.comission : +b.comission;
        }
        return a;
      },
      {} as {
        [index: string]: number;
      }
    );
    this.finantialContentTable = Object.entries(mapPrix).map(
      ([key, prix], index) => ({
        prix,
        totalCaisse: mapTotalCaisse[key],
        comission: mapComission[key],
        mois: key,
        charges: this.charges[index]?.totalExpenses.toFixed(0),
        reserveCaisse10prct: this.getMoisDebutReserve(
          key,
          mapTotalCaisse[key],
          this.charges[index]?.totalExpenses,
          mapComission[key]
        ),
        profitReel: this.getMoisDebutReserveProfitReel(
          key,
          mapTotalCaisse[key],
          this.charges[index]?.totalExpenses,
          mapComission[key],
          true
        ),
        profitReelPersonne: +(
          this.getMoisDebutReserveProfitReel(
            key,
            mapTotalCaisse[key],
            this.charges[index]?.totalExpenses,
            mapComission[key],
            false
          ) / 3
        ).toFixed(0),

        profitTheorique: this.getMoisDebutReserveProfitReel(
          key,
          prix,
          this.charges[index]?.totalExpenses,
          mapComission[key]
        ),
      })
    );

    this.dataSource = this.finantialContentTable;
  }

  getMoisDebutReserveProfitTheorique(
    dateFinReserve: string,
    prix: number,
    charges: number,
    com: number
  ): number {
    let dateDebutString = `01-${this.dateDebutReserve}`;
    const dateDebut = new Date(
      dateDebutString.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
    );
    let dateFinString = `01-${dateFinReserve}`;
    const dateFin = new Date(
      dateFinString.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
    );

    if (dateFin < dateDebut) {
      return +(prix - charges - com).toFixed(0);
    } else {
      return +((prix - charges - com) * 0.9).toFixed(0);
    }
  }
  getMoisDebutReserveProfitReel(
    dateFinReserve: string,
    caisse: number,
    charges: number,
    com: number,
    isProfitReel?: boolean
  ): number {
    let dateDebutString = `01-${this.dateDebutReserve}`;
    const dateDebut = new Date(
      dateDebutString.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
    );
    let dateFinString = `01-${dateFinReserve}`;
    const dateFin = new Date(
      dateFinString.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
    );
    let total = caisse - charges - com;

    if (!!isProfitReel && total < 0) {
      this.profitReelDeficit += total;
      return +total.toFixed(0);
    } else {
      if (dateFin < dateDebut || total < 0) {
        return +total.toFixed(0);
      }
      return +(total * 0.9).toFixed(0);
    }
  }

  getMoisDebutReserve(
    dateFinReserve: string,
    caisse: number,
    charges: number,
    com: number
  ): number {
    let dateDebutString = `01-${this.dateDebutReserve}`;
    const dateDebut = new Date(
      dateDebutString.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
    );
    let dateFinString = `01-${dateFinReserve}`;
    const dateFin = new Date(
      dateFinString.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3')
    );

    if (dateFin < dateDebut) {
      return 0;
    } else {
      let result = caisse - charges - com;
      return result > 0 ? +((caisse - charges - com) * 0.1).toFixed(0) : 0;
    }
  }

  getFechaActual(fecha: Date): string {
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString();
    return `${mes}-${anio}`;
  }
  public getTotalCost(element: string): number {
    console.log(this.profitReelDeficit.toFixed(0));
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
      case 'reserveCaisse10prct':
        return this.totalSavings;
      // this.finantialContentTable
      //   .map((t) => {
      //     if (t?.reserveCaisse10prct != undefined) {
      //       return Number(t?.reserveCaisse10prct);
      //     } else {
      //       return Number(t?.reserveCaisse10prct);
      //     }
      //   })
      // .reduce((acc, value) => acc + value, 0)
      case 'profitReel':
        return this.finantialContentTable
          .map((t) => {
            return Number(t?.profitReel);
          })
          .reduce((acc, value) => acc + value, 0);
      case 'profitReelPersonne':
        return this.finantialContentTable
          .map((t) => {
            return Number(t?.profitReelPersonne);
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
