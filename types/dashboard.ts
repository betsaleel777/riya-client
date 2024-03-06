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
  contrats: { uptodate: number; notuptodate: number };
  paiements: { dates: string[]; achats: number[]; loyers: number[] };
  locations: { dates: string[]; cautions: number[]; avances: number[]; frais: number[] };
};
