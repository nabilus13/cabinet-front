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
  telephone?: string;
  prix: number;
  comission?: number;
  totalCaisse?: number;
}
