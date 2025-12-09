import type { Contrat } from "./contrat";
import type { Achat } from "./achat";
import type { Audit, Entity } from "./global";
import type { Loyer } from "./loyer";

interface Paiement extends Entity {
  code: string;
  montant: number;
  created_at: string;
  status: string;
  payable?: Achat & Loyer & Contrat;
  payable_id: number;
  payable_type: string;
  audit: Audit
}

type Paiements = Array<Paiement>;

export type { Paiement, Paiements };
