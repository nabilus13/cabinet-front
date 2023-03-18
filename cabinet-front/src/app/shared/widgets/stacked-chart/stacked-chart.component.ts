import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import Data from 'highcharts/modules/data';
import ExportData from 'highcharts/modules/export-data';
import HC_exporting from 'highcharts/modules/exporting';
import { ChargesItem } from 'src/app/models/charges';
Data(Highcharts);
ExportData(Highcharts);
HC_exporting(Highcharts);


@Component({
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.scss']
})

export class StackedChartComponent implements OnInit {


  highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  result: any;
  @Input() data: { [key: string]: ChargesItem[] };
  @Input() categoriesMonth: string[];

  chargesByMonth: Map<string, number[]> = new Map<string, []>();



  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.setData();
      this.setHighChartColumn();
    }
  }
  ngOnInit(): void {
    if (this.data != null) {
      this.setData();
      this.setHighChartColumn();
    }
  }

  setData() {
    if (this.data != null) {

      const ids = new Set<string>();

      for (const monthExpenses of Object.values(this.data)) {
        for (const expense of monthExpenses) {
          ids.add(expense.id ?? '');
        }
      }
      let arrayCharges = [...ids];
      const new_data: { [id: string]: number[] } = {};


      arrayCharges.forEach((type: string) => {
        let array: number[] = [];
        for (const [month, values] of Object.entries(this.data)) {
          if (values.some((v) => v.id === type)) {
            let val = values.find((v) => { return v.id == type })?.prix;
            array.push(val ?? 0)
          } else {
            array.push(0)
          }

        }
        this.chargesByMonth.set(type, array);

      });
    }


  }
  setHighChartColumn() {
    this.chartOptions = {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Comptabilité Charges',
      },
      subtitle: {
        text: 'Source: 2022-2023',
      },
      exporting: {
        enabled: true,
      },
      xAxis: {
        categories: Object.values(this.categoriesMonth),
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Valeur en Dirham',
          align: 'high'
        },
        labels: {
          overflow: 'justify',
        },
      },
      tooltip: {
        valueSuffix: ' Dirham',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        },
        series: {
          stacking: 'normal'
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'AUTRES',
          type: 'bar',
          data: this.chargesByMonth.get('AUTRES'),
        },
        {
          name: 'TRANSPORT',
          type: 'bar',
          data: this.chargesByMonth.get('TRANSPORT'),
        },
        {
          name: 'RRHH',
          type: 'bar',
          data: this.chargesByMonth.get('RRHH'),
        },
        {
          name: 'BUREAU',
          type: 'bar',
          data: this.chargesByMonth.get('BUREAU'),
        },
        {
          name: 'IMPOTS',
          type: 'bar',
          data: this.chargesByMonth.get('IMPOTS'),
        },
        {
          name: 'FACTURES',
          type: 'bar',
          data: this.chargesByMonth.get('FACTURES'),
        },
        {
          name: 'LOYERS',
          type: 'bar',
          data: this.chargesByMonth.get('LOYERS'),
        },
        {
          name: 'FRAIS_ENTREPRISE',
          type: 'bar',
          data: this.chargesByMonth.get('FRAIS_ENTREPRISE'),
        },
        {
          name: 'EQUIPEMENTS',
          type: 'bar',
          data: this.chargesByMonth.get('EQUIPEMENTS'),
        },
      ]

    }
  }

}
