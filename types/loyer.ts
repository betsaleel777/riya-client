import { Appartement } from "./appartement";
import { Contrat } from "./contrat";
import { Entity } from "./global";
import { Client } from "./personne";

interface Loyer extends Entity {
  code: string;
  montant: number;
  status: string;
  personne: string & Client;
  bien: string & Appartement;
  created_at: string;
  contrat_id: number;
  contrat: Contrat
}

type Loyers = Array<Loyer>;

export { Loyers, Loyer };
