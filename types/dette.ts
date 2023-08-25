import { Contrat } from "./contrat";
import { Entity } from "./global";
import { Paiement } from "./paiements";
import { Visite } from "./visite";

interface Dette extends Entity {
  code: string;
  status: string;
  montant: number;
  origine_id: number;
  origine_type: string;
  origine_code: string;
  origine: Visite | Paiement;
  contrat: Contrat;
  created_at: string;
}

type Dettes = Array<Dette>;

export { Dettes, Dette };
