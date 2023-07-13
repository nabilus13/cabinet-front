import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { ApiServiceService } from '../services/api-service.service';
import { CustomValidatorDirective } from './custom-validator.directive';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { DialogFormComponentComponent } from './dialog-form-component/dialog-form-component.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CostsTableComponent } from './postTables/costs-table/costs-table.component';
import { ExpensesTableComponent } from './postTables/expenses-table/expenses-table.component';
import { FinancialTableComponent } from './postTables/financial-table/financial-table.component';
import { GeneralTableComponent } from './postTables/general-table/general-table.component';
import { SharedRoutingModule } from './shared-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardBannerComponent } from './widgets/card-banner/card-banner.component';
import { ColumnChartComponent } from './widgets/column-chart/column-chart.component';
import { LineChartComponent } from './widgets/line-chart/line-chart.component';
import { PieChartComponent } from './widgets/pie-chart/pie-chart.component';
import { StackedChartComponent } from './widgets/stacked-chart/stacked-chart.component';

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
    FinancialTableComponent,
    ExpensesTableComponent,
    DialogFormComponentComponent,
    DialogConfirmationComponent,
    CustomValidatorDirective,
    CostsTableComponent,
    StackedChartComponent,
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
    SharedRoutingModule,
    MatSortModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ModalModule.forRoot(),
    MatTooltipModule,
    MatTabsModule,
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
    FinancialTableComponent,
    ExpensesTableComponent,
    CostsTableComponent,
    StackedChartComponent,
  ],
  entryComponents: [DialogFormComponentComponent, DialogConfirmationComponent],
  providers: [ApiServiceService, DatePipe, BsModalRef],
})
export class SharedModule {}
