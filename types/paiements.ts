import { Achat } from "./achat";
import { Audit, Entity } from "./global";
import { Loyer } from "./loyer";

interface Paiement extends Entity {
  code: string;
  montant: number;
  created_at: string;
  status: string;
  payable?: Achat & Loyer;
  payable_id: number;
  payable_type: string;
  audit: Audit
}

type Paiements = Array<Paiement>;

export { Paiement, Paiements };
