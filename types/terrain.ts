import { Bien, Type } from "./global";

interface Terrain extends Bien {
  type_terrain_id?: number;
  type?: string;
}

interface TypeTerrain extends Type {}

type Terrains = Array<Terrain>;
type TypeTerrains = Array<TypeTerrain>;

export { TypeTerrain, TypeTerrains, Terrains, Terrain };
