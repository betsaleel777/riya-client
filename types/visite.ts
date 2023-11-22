import { Appartement } from "./appartement";
import { Entity, User } from "./global";
import { Client } from "./personne";

const enum OperationName {
  FRAIS = "frais",
  CAUTION = "cautions",
  AVANCE = "avances",
}

interface Operation extends Entity {
  mois: number;
  visite_id: number;
  type: string;
  created_at: string;
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
  frais_dossier: number;
  responsable: User
}

interface VisiteValidation extends Entity {
  code: string;
  montant: number;
  created_at: string;
  personne: string;
  avatar: string;
  bien: string;
}

interface VisiteInfo extends Entity {
  loyer: number;
}

type Visites = Array<Visite>;
type VisiteValidations = Array<VisiteValidation>

export { Visite, Visites, VisiteInfo, Operation, OperationName, VisiteValidation, VisiteValidations };
