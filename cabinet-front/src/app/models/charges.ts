export interface Charges {
  id: number;
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
}
