import { Appartement } from "./appartement";
import { Entity } from "./global";
import { Paiement } from "./paiements";
import { Client } from "./personne";

interface Loyer extends Entity {
  code: string;
  montant: number;
  status: string;
  client: string | Client;
  bien: string | Appartement;
  created_at: string;
  contrat_id: number;
  paiement?: Paiement;
}

type Loyers = Array<Loyer>;

export { Loyers, Loyer };
