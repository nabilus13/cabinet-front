import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardBannerTile } from 'src/app/models/card-banner-tile';
import { Charges, ChargesItem } from 'src/app/models/charges';
import { Client } from 'src/app/models/client';
import { Expenses } from 'src/app/models/financial-table';
import { ApiChargesServices } from 'src/app/services/api-charges.service';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  cols: number = 4;
  chartCols: number = 5;
  data: Client[] = [];
  //calcula xAxi dinamicamente con mes y año ej. Jan-22
  categoriesMonth: string[] = [];
  // ingresos brutos acordados con clientes(Prix)
  caisseTotaTeorique: { [key: string]: number };
  // ingresos brutos cobrados al clientes
  caisseTotalReel: { [key: string]: number };
  // comisiones totales
  comissionTotale: { [key: string]: number };
  // beneficio real quitando gastos
  profitTotalReel: number[];
  // beneficio teorico quitando gastos
  profitTotalTheorique: number[];
  // array solo con totales de charges
  chargesFixes: number[] = [];
  // diferencia entre lo cobrado y lo que falta por cobrar del cliente
  totalDette: { [key: string]: number };

  //gastos
  charges: any[] = [];
  result: Expenses[] = [];
  chargesApi: Charges[] = [];
  chargesMonth: { [key: string]: ChargesItem[] };
  loaderEnabled: boolean;

  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  subscription: Subscription;
  subscription2: Subscription;

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 2,
    sm: 2,
    xs: 1,
  };
  chartGridByBreakpoint = {
    xl: 5,
    lg: 5,
    md: 3,
    sm: 3,
    xs: 3,
  };
  constructor(
    private breakpointObserver: BreakpointObserver,
    private apiServiceService: ApiServiceService,
    private apiServiceCharges: ApiChargesServices
  ) {
    this.loaderEnabled = true;

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.cols = this.gridByBreakpoint.xs;
            this.chartCols = this.chartGridByBreakpoint.xs;
            // this.doughnutCols = 3;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
            this.chartCols = this.chartGridByBreakpoint.sm;
            // this.doughnutCols = 3;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
            this.chartCols = this.chartGridByBreakpoint.md;
            // this.doughnutCols = 3;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.gridByBreakpoint.lg;
            this.chartCols = this.chartGridByBreakpoint.lg;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.gridByBreakpoint.xl;
            this.chartCols = this.chartGridByBreakpoint.xl;
          }
        }
      });
  }

  tiels: CardBannerTile[] = [];
  ngOnInit(): void {
    this.subscription2 = this.apiServiceService
      .getExpenses()
      .subscribe((res) => {
        this.charges = res;
      });

    const obs1 = this.apiServiceCharges.apiAllCharges;

    const obs2 = this.apiServiceService.apiAllClients;

    this.subscription = forkJoin([obs1, obs2])
      .pipe(
        map(([chargesResp, clientsRes]) => {
          this.chargesApi = chargesResp;
          this.setChargesData();

          this.data = clientsRes;
          this.setCommonData();
          this.setCardBanners();
        })
      )
      .subscribe(() => {
        this.loaderEnabled = false;
      });
  }
  setChargesData(): void {
    const toDate = (str: Date) =>
      new Date(str.toString().replace(/^(\d+)\/(\d+)\/(\d+)$/, '$2/$1/$3'));
    //calclo de charges
    this.chargesMonth = this.chargesApi.reduce(
      (acc, b: Charges, currentIndex: number, array: Charges[]) => {
        let monthLiteral = this.months[toDate(b.datePaiement).getMonth()];
        let yr = toDate(b.datePaiement).getFullYear().toString().slice(-2);
        //identificador para sacar cada año y deiferenciar
        let monthAndYear = `${monthLiteral}-${yr}`;
        const type = b.type.code;
        const price = b.prix;
        if (!acc[monthAndYear]) {
          acc[monthAndYear] = [];
        }

        const typeIndex = acc[monthAndYear].findIndex((e) => e.id === type);
        if (typeIndex === -1) {
          acc[monthAndYear].push({
            id: type ?? 'id',
            prix: price,
            listMonth: [b],
          });
        } else {
          acc[monthAndYear][typeIndex].prix += price;
          acc[monthAndYear][typeIndex].listMonth?.push(b);
        }

        return acc;
      },
      {} as { [monthYear: string]: ChargesItem[] }
    );

    if (this.chargesMonth != null) {
      console.log(this.chargesMonth);
      for (const [month, values] of Object.entries(this.chargesMonth)) {
        const total = values.reduce((acc, item) => acc + item.prix, 0);
        this.chargesFixes.push(+total.toFixed(2));
        this.result.push({
          dateReception: month,
          totalExpenses: +total.toFixed(2),
        });
      }

      this.apiServiceCharges.setCharges(this.result);
      this.apiServiceCharges.setListCharges(this.chargesMonth);
    }
  }

  setCommonData(): void {
    const toDate = (str: Date) =>
      new Date(str.toString().replace(/^(\d+)\/(\d+)\/(\d+)$/, '$2/$1/$3'));
    this.data.forEach((client) => {
      // let dateReception: Date = client.dateReception;
      let dateReception = new Date(client.dateReception);
      let monthLiteral = this.months[dateReception.getMonth()];
      let yr = dateReception.getFullYear().toString().slice(-2);
      let monthYear = `${monthLiteral}-${yr}`;
      if (!this.categoriesMonth.includes(monthYear)) {
        this.categoriesMonth.push(monthYear);
      }
    });

    this.totalDette = this.data
      .filter((client) => {
        return client?.prix - client?.totalCaisse > 0;
      })
      .reduce(
        (a, b) => {
          const m = toDate(b.dateReception).getMonth();
          let monthLiteral = this.months[toDate(b.dateReception).getMonth()];
          let yr = toDate(b.dateReception).getFullYear().toString().slice(-2);
          //identificador para sacar cada año y diferenciar por años
          let monthYear = `${monthLiteral}-${yr}`;
          a[monthYear] = a[monthYear]
            ? +a[monthYear] + b.prix - b.totalCaisse
            : +b.prix - b.totalCaisse;
          return a;
        },
        {} as {
          [index: string]: number;
        }
      );

    this.caisseTotaTeorique = this.data.reduce(
      (a, b) => {
        let monthLiteral = this.months[toDate(b.dateReception).getMonth()];
        let yr = toDate(b.dateReception).getFullYear().toString().slice(-2);
        //identificador para sacar cada año y diferenciar por años
        let monthYear = `${monthLiteral}-${yr}`;
        a[monthYear] = a[monthYear] ? +a[monthYear] + b.prix : +b.prix;
        return a;
      },
      {} as {
        [monthYear: string]: number;
      }
    );
    this.caisseTotalReel = this.data.reduce(
      (a, b) => {
        let monthLiteral = this.months[toDate(b.dateReception).getMonth()];
        let yr = toDate(b.dateReception).getFullYear().toString().slice(-2);
        //identificador para sacar cada año y deiferenciar
        let monthYear = `${monthLiteral}-${yr}`;
        a[monthYear] = a[monthYear]
          ? +a[monthYear] + b.totalCaisse
          : +b.totalCaisse;
        return a;
      },
      {} as {
        [monthYear: string]: number;
      }
    );

    this.comissionTotale = this.data.reduce(
      (a, b) => {
        let monthLiteral = this.months[toDate(b.dateReception).getMonth()];
        let yr = toDate(b.dateReception).getFullYear().toString().slice(-2);
        //identificador para sacar cada año y deiferenciar
        let monthYear = `${monthLiteral}-${yr}`;
        if (!!b?.comission) {
          a[monthYear] = a[monthYear]
            ? +a[monthYear] + b.comission
            : +b.comission;
        }
        return a;
      },
      {} as {
        [monthYear: string]: number;
      }
    );
    //objeto para sacar el resto de totales netos
    //totales - comisiones- charges
    const arrayAll = Object.entries(this.caisseTotaTeorique).map(
      ([key, prix], index) => ({
        profitTotalReel:
          this.caisseTotalReel[key] -
          this.result[index]?.totalExpenses -
          this.comissionTotale[key],
        profitTotalTheorique:
          prix - this.result[index]?.totalExpenses - this.comissionTotale[key],
      })
    );

    //reducer para extraer los simatorios anteriores ewn un solo array
    this.profitTotalReel = arrayAll.reduce(
      (a, b) => [...a, b.profitTotalReel],

      [] as number[]
    );

    this.profitTotalTheorique = arrayAll.reduce(
      (a, b) => [...a, b.profitTotalTheorique],

      [] as number[]
    );

    console.log(this.profitTotalTheorique);
  }

  setCardBanners() {
    let sum = 0;
    for (let key in this.totalDette) {
      sum += this.totalDette[key];
    }
    let sumCaisse = 0;
    for (let key in this.caisseTotalReel) {
      sumCaisse += this.caisseTotalReel[key];
    }
    this.tiels = [
      {
        title: 'Beneficio Teorico',
        subtitle: '2022',
        imgSource: '../../../../assets/revenue-icon-20.png',
        amount: this.profitTotalTheorique.reduce((acc, val) => (acc += val), 0),
      },
      {
        title: 'Beneficio Real',
        subtitle: '2022',
        imgSource: '../../../../assets/revenue-icon-12.png',
        amount: this.profitTotalReel.reduce((acc, val) => (acc += val), 0),
      },
      {
        title: 'Deuda Tolal',
        subtitle: '2022',
        imgSource: '../../../../assets/revenue-icon-24.png',
        amount: sum,
      },
      {
        title: 'Total Bruto Real',
        subtitle: '2022',
        imgSource: '../../../../assets/revenue-icon-29.png',
        amount: sumCaisse,
      },
    ];
  }
  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
    if (!!this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
}
