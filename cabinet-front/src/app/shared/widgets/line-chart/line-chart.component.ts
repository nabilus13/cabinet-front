import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { mockLineOptions } from 'src/app/mocks/client-mock';
// import exporting from 'highcharts/modules/exporting';
// exporting(Highcharts);
import Data from 'highcharts/modules/data';
import ExportData from 'highcharts/modules/export-data';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);
Data(Highcharts);
ExportData(Highcharts);

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, AfterViewInit {
  highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  // chart:Highcharts.Chart={};

  constructor() {
    this.chartOptions = mockLineOptions;
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {}
  // HC_exporting(highcharts);
}
