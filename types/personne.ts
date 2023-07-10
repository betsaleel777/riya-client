import { Type, Personne } from "./global";

interface Client extends Personne {
  date_naissance: string;
  lieu_naissance: string;
  nationalite: string;
  ville: string;
  quartier: string;
  pays: string;
  animal: string;
  fonctions: string;
  civilite: string;
  piece?: string;
  avatar?: string;
  image_piece?: Blob;
  image_avatar?: Blob;
  type_client_id?: number;
}

interface TypePersonne extends Type {}

type Clients = Array<Client>;
type TypePersonnes = Array<TypePersonne>;

export { TypePersonne, TypePersonnes, Clients, Client };
