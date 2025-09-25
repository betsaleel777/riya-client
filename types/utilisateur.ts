import { Entity } from "./global";

interface Utilisateur extends Entity {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  oldPassword?: string;
  created_at?: string;
  photo?: string;
  image?: Blob;
  roles: string[];
}
type Utilisateurs = Array<Utilisateur>;
export { Utilisateur, Utilisateurs };
