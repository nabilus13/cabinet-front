import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Data from 'highcharts/modules/data';
import ExportData from 'highcharts/modules/export-data';
import HC_exporting from 'highcharts/modules/exporting';
import { mockBarOptions } from 'src/app/mocks/client-mock';
Data(Highcharts);
ExportData(Highcharts);
HC_exporting(Highcharts);

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
})
export class ColumnChartComponent implements OnInit {
  highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  constructor() {
    this.chartOptions = mockBarOptions;
  }

  ngOnInit(): void {}
}
