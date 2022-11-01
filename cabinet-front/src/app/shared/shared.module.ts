import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { ApiServiceService } from '../services/api-service.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { GeneralTableComponent } from './postTables/general-table/general-table.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardBannerComponent } from './widgets/card-banner/card-banner.component';
import { ColumnChartComponent } from './widgets/column-chart/column-chart.component';
import { LineChartComponent } from './widgets/line-chart/line-chart.component';
import { PieChartComponent } from './widgets/pie-chart/pie-chart.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LineChartComponent,
    CardBannerComponent,
    ColumnChartComponent,
    PieChartComponent,
    GeneralTableComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatListModule,
    MatMenuModule,
    HighchartsChartModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LineChartComponent,
    CardBannerComponent,
    ColumnChartComponent,
    PieChartComponent,
    GeneralTableComponent,
  ],
  providers: [ApiServiceService],
})
export class SharedModule {}
