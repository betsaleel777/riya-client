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

interface DepenseValidation extends Entity {
  titre: string,
  created_at: string;
  montant: number;
  type: string;
  responsable: string,
  avatar: string;
}

interface TypeDepense extends Type { }

type Depenses = Array<Depense>
type TypeDepenses = Array<TypeDepense>
type DepenseValidations = Array<DepenseValidation>

export { Depenses, Depense, TypeDepense, TypeDepenses, DepenseValidation, DepenseValidations }
