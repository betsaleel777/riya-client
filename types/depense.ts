import { Entity, Type } from "./global";



interface Depense extends Entity {
  code: string;
  type_id: number;
  type: TypeDepense | string
  titre: string;
  description: string;
}

interface TypeDepense extends Type { }

type Depenses = Array<Depense>
type TypeDepenses = Array<TypeDepense>

export { Depenses, Depense, TypeDepense, TypeDepenses }
