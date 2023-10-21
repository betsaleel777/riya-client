import { Entity, Type } from "./global";

interface Depense extends Entity {
  type_depense_id: number;
  type: TypeDepense & String;
  titre: string;
  description: string;
  created_at: string;
  montant: number;
  status: string
}

interface TypeDepense extends Type { }

type Depenses = Array<Depense>
type TypeDepenses = Array<TypeDepense>

export { Depenses, Depense, TypeDepense, TypeDepenses }
