import { MatTableDataSource } from '@angular/material/table';

export interface CostsContentTable {
  mois?: string;
  charge?: number;
  typeCharges?: TypeCosts[] | MatTableDataSource<TypeCosts>;
}
export interface TypeCosts {
  type: string;
  total: number;
  charges: CoststInfo[];
}

export interface CoststInfo {
  //   mois?: string;
  dataPaiment: Date;
  //   comission?: number | null | undefined;
  description: string;
  prix: number;
}
