export interface Charges {
  id: number;
  datePaiement: Date;
  description: string;
  prix: number;
  type: TypeCharges;
}

export interface Charges2 {
  datePaiement: Date;
  description: string;
  prix: number;
  type: TypeCharges;
}

export interface TypeCharges {
  id: number;
  code?: string;
  libelle?: string;
}
export interface ChargesItem {
  prix: number;
  id: string;
  listMonth?: Charges[];
}
export interface ListeChargesItems {
  [key: string]: ChargesItem[];
}
export interface ChargesExport {
  date: string;
  description: string;
  prix: number;
  type: string;
}
export interface ChargesImport {
  id: string;
  date_paiement: string;
  description: string;
  prix: string;
}
