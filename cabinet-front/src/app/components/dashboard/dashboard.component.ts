import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { tiles } from 'src/app/mocks/banner-tile-mock';
import { CardBannerTile } from 'src/app/models/card-banner-tile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cols: number = 4;
  chartCols: number = 5;

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
  constructor(private breakpointObserver: BreakpointObserver) {
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
    this.tiels = tiles;
    console.log(tiles);
    console.log(this.tiels);
    console.log(this.cols);
  }
}
