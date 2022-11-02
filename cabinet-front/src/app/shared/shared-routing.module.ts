import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesTableComponent } from './postTables/expenses-table/expenses-table.component';
import { FinancialTableComponent } from './postTables/financial-table/financial-table.component';
import { GeneralTableComponent } from './postTables/general-table/general-table.component';
/*All this routes are under PostComponent */
const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: 'general',
    component: GeneralTableComponent,
  },
  {
    path: 'finantial',
    component: FinancialTableComponent,
  },
  {
    path: 'expenses',
    component: ExpensesTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
