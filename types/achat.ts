import { Appartement } from "./appartement";
import { Entity } from "./global";
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
}

type Achats = Array<Achat>;

export { Achats, Achat };
