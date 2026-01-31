export type Rapport = {
  id: number;
  proprietaire: string;
  total: number;
  paye: number;
  a_rembourser: number;
  rembourse: number;
  biens: number;
};
export type Dashboard = {
  clients: number;
  locataires: number;
  biens: number;
  visites: number;
  taux: number;
  depenses: number;
  remboursements: number;
  terrains: number;
  appartements: number;
  chiffres: number;
  rapport: Rapport[];
  contrats: { uptodate: number; notuptodate: number };
  paiements: { dates: string[]; achats: number[]; loyers: number[] };
  locations: { dates: string[]; cautions: number[]; avances: number[]; frais: number[] };
};
