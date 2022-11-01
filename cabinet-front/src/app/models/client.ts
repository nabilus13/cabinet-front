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
  totalCaisse?: number;
}
