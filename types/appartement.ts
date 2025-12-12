import type { Bien, Type } from "./global";
import type { Proprietaire } from "./proprietaire";

interface Appartement extends Bien {
  cours_commune: boolean;
  placard: boolean;
  etage: boolean;
  toilette: boolean;
  cuisine: boolean;
  garage: boolean;
  parking: boolean;
  cie: boolean;
  socdeci: boolean;
  cloture: boolean;
  type?: string & Type;
  proprietaire?: string & Proprietaire;
  type_appartement_id?: number;
  observation?: string;
}

interface TypeAppartement extends Type { }

type Appartements = Array<Appartement>;
type TypeAppartements = Array<TypeAppartement>;

export type { TypeAppartement, TypeAppartements, Appartements, Appartement };
