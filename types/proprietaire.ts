import { Personne } from "./global";

interface Proprietaire extends Personne {}
type Proprietaires = Array<Proprietaire>;

export { Proprietaire, Proprietaires };
