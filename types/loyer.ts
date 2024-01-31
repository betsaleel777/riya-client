import { Appartement } from "./appartement";
import { Contrat } from "./contrat";
import { Entity, Media } from "./global";
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
}

interface LoyerValidation extends Entity {
  code: string;
  montant: string;
  personne: string
  bien: string;
  created_at: string;
  avatar: Media;
}

type Loyers = Array<Loyer>;
type LoyerValidations = Array<LoyerValidation>
export { Loyers, Loyer, LoyerValidation, LoyerValidations };
