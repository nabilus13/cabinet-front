export interface Client {
  id: number;
  dateReception: Date;
  nombrePlans: number;
  dossier?: string;
  client: string;
  representant?: string;
  lieux?: string;
  dateLivraison?: Date;
  situation?: string;
  telephone?: number;
  prix: number;
  comission?: number | null;
  totalCaisse: number;
  commentaire?: string;
}
export interface ClientDto {
  id: string;
  date_reception: string;
  nombre_plans: string;
  dossier?: string;
  client: string;
  representant?: string;
  situation?: string;
  lieux: string;
  date_livraison?: string;
  telephone?: string;
  prix: string;
  comission?: string;
  total_caisse?: string;
  commentaire?: string;
}
export enum TypeRequest {
  Save = 'Save',
  Update = 'Update',
  Reglement = 'Reglement',
  Close = 'Close',
}

export interface ResultDialog {
  clientData?: Client;
  type?: TypeRequest;
  isClosing?: boolean;
}

