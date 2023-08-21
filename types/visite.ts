import { Appartement } from "./appartement";
import { Entity } from "./global";
import { Client } from "./personne";
import { Terrain } from "./terrain";

const enum OperationName {
  FRAIS = "frais",
  CAUTION = "cautions",
  AVANCE = "avances",
}

interface Operation extends Entity {
  mois: number;
  visite_id: number;
  type: string;
}

interface Visite extends Entity {
  code: string;
  personne_id: number;
  personne?: Client;
  appartement_id: number;
  appartement?: Appartement;
  montant: number;
  date_expiration: string;
  created_at: string;
  status: string;
  caution: number;
  avance: number;
  frais: number;
  cautionObject: Operation | null;
  avanceObject: Operation | null;
  fraisObject: Operation | null;
  avanceStatus: string;
}

interface VisiteInfo extends Entity {
  loyer: number;
}

type Visites = Array<Visite>;

export { Visite, Visites, VisiteInfo, Operation, OperationName };
