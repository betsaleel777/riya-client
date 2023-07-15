import { Achat } from "./achat";
import { Entity } from "./global";
import { Visite } from "./visite";

interface Contrat extends Entity {
  code: string;
  debut?: string;
  fin?: string;
  bien: string;
  operation_id: number;
  operation_type: string;
  commission?: string;
  operation?: Achat | Visite;
  created_at: string;
}

type Contrats = Array<Contrat>;

export { Contrat, Contrats };
