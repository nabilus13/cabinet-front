import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as Highcharts from 'highcharts';
// import exporting from 'highcharts/modules/exporting';
// exporting(Highcharts);
import Data from 'highcharts/modules/data';
import ExportData from 'highcharts/modules/export-data';
import HC_exporting from 'highcharts/modules/exporting';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ApiServiceService } from 'src/app/services/api-service.service';
HC_exporting(Highcharts);
Data(Highcharts);
ExportData(Highcharts);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @Input() data: Client[];
  @Input() months: string[];
  @Input() categoriesMonth: any[];
  @Input() charges: any[];
  @Input() caisseTotaTeorique: { [key: string]: number };
  @Input() caisseTotalReel: { [key: string]: number };
  @Input() comissionTotale: { [key: string]: number };
  @Input() profitTotalReel: number[];
  @Input() profitTotalTheorique: number[];
  highcharts = Highcharts;
  subscription: Subscription;

  chartOptions: Highcharts.Options = {};
  // charges: any[] = [];

  // chart:Highcharts.Chart={};

  constructor(
    // private serviceApi: ApiServiceService,
    private apiServiceService: ApiServiceService
  ) {
    // this.chartOptions = mockLineOptions;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.setHighChartLine();
    }
  }
  ngOnDestroy(): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngAfterViewInit(): void {
    if (this.data.length > 0) {
      this.setHighChartLine();
    }
  }

  ngOnInit(): void {
    if (this.data.length > 0) {
      this.setHighChartLine();
    }
  }
  // HC_exporting(highcharts);
  setHighChartLine(): void {
    this.chartOptions = {
      chart: {
        type: 'spline',
      },
      title: {
        text: 'Caisse et Profit',
      },
      subtitle: {
        text: 'Source: 2022-2023',
      },
      exporting: {
        enabled: true,
      },
      xAxis: {
        categories: this.categoriesMonth,
      },
      yAxis: {
        title: {
          text: 'Valeur en Dirham',
        },
      },
      tooltip: {
        valueSuffix: ' Dirham',
      },
      series: [
        {
          name: 'caisseTotaTeorique',
          type: 'line',
          data: Object.values(this.caisseTotaTeorique),
        },
        {
          name: 'caisseTotalReel',
          type: 'line',
          data: Object.values(this.caisseTotalReel),
        },
        {
          name: 'profitTotalTheorique',
          type: 'line',
          data: this.profitTotalTheorique,
        },
        {
          name: 'profitTotalReel',
          type: 'line',
          data: this.profitTotalReel,
        },
      ],
    };
  }
}
