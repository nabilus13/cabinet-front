import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Data from 'highcharts/modules/data';
import ExportData from 'highcharts/modules/export-data';
import HC_exporting from 'highcharts/modules/exporting';
import { mockPieOptions } from 'src/app/mocks/client-mock';
Data(Highcharts);
ExportData(Highcharts);
HC_exporting(Highcharts);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  constructor() {
    this.chartOptions = mockPieOptions;
  }

  ngOnInit(): void {}
}
