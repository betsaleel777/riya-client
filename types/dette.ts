import { Contrat } from "./contrat";
import { Audit, Entity } from "./global";
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
interface DetteValidation extends Entity {
  code: string;
  montant: number;
  created_at: string
  origine: string;
  audit: Audit
}

type Dettes = Array<Dette>;
type DetteValidations = Array<DetteValidation>

export { Dettes, Dette, DetteValidation, DetteValidations };
