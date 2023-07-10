import { Bien, Type } from "./global";

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
  type?: string;
  type_appartement_id?: number;
  observation?: string;
}

interface TypeAppartement extends Type {}

type Appartements = Array<Appartement>;
type TypeAppartements = Array<TypeAppartement>;

export { TypeAppartement, TypeAppartements, Appartements, Appartement };
