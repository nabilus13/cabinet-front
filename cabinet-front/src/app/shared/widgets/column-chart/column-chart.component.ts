import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import Data from 'highcharts/modules/data';
import ExportData from 'highcharts/modules/export-data';
import HC_exporting from 'highcharts/modules/exporting';
import { Client } from 'src/app/models/client';
Data(Highcharts);
ExportData(Highcharts);
HC_exporting(Highcharts);

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
})
export class ColumnChartComponent implements OnInit, OnChanges {
  @Input() data: Client[];

  @Input() categoriesMonth: any[];
  @Input() caisseTotaTeorique: { [key: string]: number };
  @Input() caisseTotalReel: { [key: string]: number };
  @Input() comissionTotale: { [key: string]: number };
  @Input() totalDette: { [key: string]: number };
  @Input() profitTotalReel: number[];
  @Input() profitTotalTheorique: number[];
  @Input() chargesFixes: number[];

  highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.totalDette);
    if (changes.data) {
      this.setHighChartColumn();
    }
  }
  ngOnInit(): void {
    if (this.data.length > 0) {
      this.setHighChartColumn();
    }
  }

  setHighChartColumn() {
    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Comptabilité générale',
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
        min: 0,
        title: {
          text: 'Valeur en Dirham',
        },
        labels: {
          overflow: 'justify',
        },
      },
      tooltip: {
        valueSuffix: ' Dirham',
      },
      series: [
        {
          name: 'Prix',
          type: 'column',
          data: Object.values(this.caisseTotaTeorique),
        },
        {
          name: 'Comission',
          type: 'column',
          data: Object.values(this.comissionTotale),
        },
        {
          name: 'Totale Caisse',
          type: 'column',
          data: Object.values(this.caisseTotalReel),
        },
        {
          name: 'Manque à payer',
          type: 'column',
          data: Object.values(this.totalDette),
        },
        {
          name: 'Charges Fixes',
          type: 'column',
          data: this.chargesFixes,
        },
        {
          name: 'Profit Réel',
          type: 'column',
          data: this.profitTotalReel,
        },
        {
          name: 'Profit Théorique',
          type: 'column',
          data: this.profitTotalTheorique,
        },
      ],
    };
  }
}
