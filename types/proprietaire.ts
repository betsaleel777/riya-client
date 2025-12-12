import type { Personne } from "./global";

interface Proprietaire extends Personne { }
type Proprietaires = Array<Proprietaire>;

export type { Proprietaire, Proprietaires };
