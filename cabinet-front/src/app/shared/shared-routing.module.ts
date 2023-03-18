import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostsTableComponent } from './postTables/costs-table/costs-table.component';
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
    path: 'debts',
    component: ExpensesTableComponent,
  },
  {
    path: 'costs',
    component: CostsTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
