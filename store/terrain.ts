import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { TypePostForm, TypePutForm } from "~/types/global";
import { Terrain, Terrains, TypeTerrain, TypeTerrains } from "~/types/terrain";

const useTypeTerrainStore = defineStore("type-terrain", () => {
  const { $apiFetch } = useNuxtApp();

  let types = ref<TypeTerrains>([]);
  let type = ref<TypeTerrain>({});
  let loading = reactive({ index: false, edit: false })

  const getAll = async () => {
    try {
      loading.index = true;
      types.value = await $apiFetch<TypeTerrains>("api/typeTerrain");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: TypePostForm) => {
    try {
      const response = await $apiFetch<string>("api/typeTerrain", { method: "post", body: payload });
      await getAll();
      return response;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const update = async (payload: TypePutForm) => {
    try {
      const response = await $apiFetch<string>("api/typeTerrain/" + payload.id, { method: "put", body: payload });
      await getAll();
      return response;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const trash = async (id: number) => {
    try {
      const response = await $apiFetch<string>("api/typeTerrain/" + id, { method: "delete" });
      await getAll();
      return response;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      type.value = await $apiFetch<TypeTerrain>("api/typeTerrain/" + id, { method: "get" });
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  return { types, type, loading, getAll, create, update, getOne, trash };
});

const useTerrainStore = defineStore("terrain", () => {
  const { $apiFetch } = useNuxtApp();
  let terrains = ref<Terrains>([]);
  let terrain = ref<Terrain>();
  let loading = reactive({ index: false, edit: false })

  const libres = computed<Terrains>(() => terrains.value.filter((terrain) => terrain.status === statusBien.free));

  const getAll = async () => {
    try {
      loading.index = true;
      terrains.value = await $apiFetch<Terrains>("api/terrains");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: Terrain) => {
    try {
      const response = await $apiFetch<string>("api/terrains", { method: "post", body: payload });
      await getAll();
      return response;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const update = async (payload: Terrain) => {
    try {
      const response = await $apiFetch<string>("api/terrains/" + payload.id, {
        method: "put",
        body: payload
      });
      await getAll();
      return response;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const trash = async (id: number) => {
    try {
      const response = await $apiFetch<string>("api/terrains/" + id, { method: "delete" });
      await getAll();
      return response;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      terrain.value = await $apiFetch<Terrain>("api/terrains/" + id, { method: "get" });
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  return { terrain, terrains, libres, loading, getAll, create, update, getOne, trash };
});

export { useTypeTerrainStore, useTerrainStore };
