import type { Achat } from "./achat";
import type { Entity } from "./global";
import type { Visite } from "./visite";

interface Contrat extends Entity {
  code: string;
  debut?: string;
  fin?: string;
  bien: string;
  client: string,
  operation_id: number;
  operation_type: string;
  commission?: string;
  operation?: Achat & Visite;
  created_at: string;
  status: string;
  etat: string;
  montant_location: number;
}

type Contrats = Array<Contrat>;

export type { Contrat, Contrats };
