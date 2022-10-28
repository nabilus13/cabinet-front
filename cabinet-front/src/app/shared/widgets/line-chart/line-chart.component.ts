import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { mockOptions } from 'src/app/mocks/client-mock';
// import exporting from 'highcharts/modules/exporting';
// exporting(Highcharts);
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

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
    this.chartOptions = mockOptions;
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {}
  // HC_exporting(highcharts);
}
