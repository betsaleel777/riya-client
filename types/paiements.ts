import { Achat } from "./achat";
import { Entity } from "./global";
import { Loyer } from "./loyer";

interface Paiement extends Entity {
  code: string;
  montant: number;
  created_at: string;
  status: string;
  payable?: Achat & Loyer;
  payable_id: number;
  payable_type: string;
}

type Paiements = Array<Paiement>;

export { Paiement, Paiements };
