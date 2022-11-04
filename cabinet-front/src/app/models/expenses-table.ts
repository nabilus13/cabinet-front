import { MatTableDataSource } from '@angular/material/table';

export interface ExpensesContentTable {
  mois?: string;
  dette?: number;
  clients?: ExpensesClientInfo[] | MatTableDataSource<ExpensesClientInfo>;
}
export interface ExpensesClientInfo {
  //   mois?: string;
  dateReception: Date;
  //   comission?: number | null | undefined;
  client: string;
  representant?: string;
  telephone?: number;
  situation?: string;
  prix: number;
  totalCaisse: number;
}
