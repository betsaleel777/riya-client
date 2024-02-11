import { Appartement } from "./appartement";
import { Contrat } from "./contrat";
import { Entity, Media } from "./global";
import { Paiements } from "./paiements";
import { Client } from "./personne";

interface Loyer extends Entity {
  code: string;
  montant: number;
  status: string;
  personne: string & Client;
  bien: string & Appartement;
  created_at: string;
  contrat_id: number;
  contrat: Contrat;
  paid: number;
  pending: boolean;
  paiements: Paiements;
}

interface LoyerValidation extends Entity {
  code: string;
  montant: string;
  personne: string;
  bien: string;
  created_at: string;
  cout: number;
  avatar: Media;
}

interface AvanceLoyerForm {
  contrat_id: number;
  periode: Array<string>;
}

type Loyers = Array<Loyer>;
type LoyerValidations = Array<LoyerValidation>;
export { Loyers, Loyer, LoyerValidation, LoyerValidations, AvanceLoyerForm };
