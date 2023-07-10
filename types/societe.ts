interface Societe {
  id?: number;
  description?: string;
  slogan: string;
  forme_juridique: string;
  boite_postale: string;
  contact: string;
  email: string;
  siege: string;
  logo?: string;
  image?: Blob;
  registre: string;
  raison_sociale: string;
}

interface Count {
  clients: number;
  proprietaires: number;
  biens: number;
}

export { Societe, Count };
