import type { Contrat } from "./contrat";
import type { Audit, Entity } from "./global";
import type { Paiement } from "./paiements";
import type { Visite } from "./visite";
import { operation } from "~/utils/constante";

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
  created_at: string;
  origine: string;
  audit: Audit;
}

interface Stat {
  [operation.purchase]: StatContent;
  [operation.rent]: StatContent;
  [operation.visit]: StatContent;
}

interface StatContent {
  paid: StatSubContent;
  unpaid: StatSubContent;
  pending: StatSubContent;
}

interface StatSubContent {
  amount: number;
  percentage: number;
}

type Dettes = Array<Dette>;
type DetteValidations = Array<DetteValidation>;

export type { Dettes, Dette, DetteValidation, DetteValidations, Stat, StatContent };
