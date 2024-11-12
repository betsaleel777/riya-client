interface Entity {
  id?: number;
}
interface Type extends Entity {
  nom?: string;
  created_at?: string;
}

interface Personne {
  id?: number;
  nom_complet: string;
  email: string;
  telephone: string;
  cni: string;
  created_at: string;
}

interface Bien extends Entity {
  reference: string;
  nom: string;
  ville: string;
  pays: string;
  quartier: string;
  created_at: string;
  attestation_villageoise: boolean;
  titre_foncier: boolean;
  document_cession: boolean;
  arreter_approbation: boolean;
  superficie: number;
  montant_location: number;
  montant_investit: number;
  cout_achat: number;
  proprietaire_id: number;
  proprietaire?: string;
  status: string;
}

interface User extends Entity {
  name: string;
  email: string;
  created_at: string;
  photo: string;
}

interface TypePostForm {
  nom: string;
}
interface TypePutForm extends TypePostForm {
  id: number;
}
type Types = Array<Type>;
interface Media extends Entity {
  url: string;
}
interface Audit extends Entity {
  user: User;
}
type Links = {
  first: string;
  last: string;
  prev: string;
  next: string;
};
type MetaPaginate = {
  per_page: number;
  total: number;
  current_page: number;
  path: string;
};
type DataPaginate = {
  data: Array<unknown>;
  links: Links;
  meta: MetaPaginate;
};
type SearchData = { search: string; page: number };

export {
  Entity,
  Type,
  Types,
  TypePostForm,
  TypePutForm,
  Personne,
  Bien,
  User,
  Media,
  Audit,
  Links,
  MetaPaginate,
  DataPaginate,
  SearchData,
};
