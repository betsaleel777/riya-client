import type { Appartement } from "./appartement";
import type { Audit, Entity, Media } from "./global";
import type { Paiements } from "./paiements";
import type { Client } from "./personne";
import type { Terrain } from "./terrain";

interface Achat extends Entity {
  code: string;
  personne: Client & string;
  bien: Appartement & Terrain & string;
  personne_id: number;
  bien_id: number;
  montant: number;
  total: number;
  reste: number;
  created_at: string;
  bien_type: string;
  paiements?: Paiements;
  contractible: boolean
  audit: Audit
}

interface AchatValidation extends Entity {
  code: string;
  created_at: string;
  personne: string;
  bien: string;
  cout: number;
  montant: number;
  avatar: Media
  audit: Audit
}

type Achats = Array<Achat>;
type AchatValidations = Array<AchatValidation>

export type { Achats, Achat, AchatValidation, AchatValidations };
