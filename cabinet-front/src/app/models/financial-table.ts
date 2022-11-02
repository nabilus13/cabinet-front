export interface FinantialTable {
  JAN?: {
    totals: SumTotal;
    data: ContentFinantialTable[];
  };
  FEB?: {
    totals: SumTotal;
    data: ContentFinantialTable[];
  };
  MAR?: {
    totals: SumTotal;
    data: ContentFinantialTable[];
  };
  APR?: {
    totals: SumTotal;
    data: ContentFinantialTable[];
  };
  MAY?: {
    totals: SumTotal;
    data: ContentFinantialTable[];
  };
  JUN?: {
    totals: SumTotal;
    data: ContentFinantialTable[];
  };
  JUL?: {
    totals: SumTotal;
    data: ContentFinantialTable[];
  };
  AUG?: {
    totals: SumTotal;
    data: ContentFinantialTable[];
  };
  SEP?: {
    totals: SumTotal;
    data: ContentFinantialTable[];
  };
  OCT?: {
    totals: SumTotal;
    data: ContentFinantialTable[];
  };
  NOV?: {
    totals: SumTotal;
    data: ContentFinantialTable[];
  };
  DEC?: {
    totals: SumTotal;
    data: ContentFinantialTable[];
  };
}

export interface ContentFinantialTable {
  prix?: number;
  comission?: number | null | undefined;
  totalCaisse: number;
}
export interface SumTotal {
  sumTotalPrix: number;
  sumTotalCaisse: number;
  sumTotalComission: number;
}
