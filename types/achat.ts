import { Appartement } from "./appartement";
import { Audit, Entity, Media } from "./global";
import { Paiements } from "./paiements";
import { Client } from "./personne";
import { Terrain } from "./terrain";

interface Achat extends Entity {
  code: string;
  personne: Client;
  bien: Appartement | Terrain;
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

export { Achats, Achat, AchatValidation, AchatValidations };
