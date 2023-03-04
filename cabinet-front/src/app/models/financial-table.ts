export interface ContentFinantialTable {
  mois?: string;
  prix?: number;
  comission?: number | null | undefined;
  totalCaisse?: number;
  charges?: number;
  reserveCaisse10prct?: number;
  profitReel?: number;
  profitTheorique?: number;
}

export interface Expenses {
  //   JAN?: {
  dateReception: string;
  totalExpenses: number;
}

export const monthConst = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];
