import { Achat } from "./achat";
import { Entity } from "./global";

interface Paiement extends Entity {
  code: string;
  montant: number;
  created_at: string;
  status: string;
  achat?: Achat;
  achat_id: number;
}

type Paiements = Array<Paiement>;

export { Paiement, Paiements };
