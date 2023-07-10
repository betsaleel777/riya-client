import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { TypePostForm, TypePutForm } from "~/types/global";
import { Terrain, Terrains, TypeTerrain, TypeTerrains } from "~/types/terrain";

const useTypeTerrainStore = defineStore("type-terrain", () => {
  const { $apiFetch } = useNuxtApp();

  let types = ref<TypeTerrains>([]);
  let type = ref<TypeTerrain>({});
  let loading = ref(false);
  let loadingEdit = ref(false);

  const getAll = async () => {
    try {
      loading.value = true;
      types.value = await $apiFetch<TypeTerrains>("api/typeTerrain");
      loading.value = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: TypePostForm) => {
    const response = await $apiFetch<string>("api/typeTerrain", {
      method: "post",
      body: payload,
    });
    await getAll();
    return response;
  };

  const update = async (payload: TypePutForm) => {
    const response = await $apiFetch<string>("api/typeTerrain/" + payload.id, {
      method: "put",
      body: payload,
    });
    await getAll();
    return response;
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/typeTerrain/" + id, {
      method: "delete",
    });
    await getAll();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loadingEdit.value = true;
      const response = await $apiFetch<TypeTerrain>("api/typeTerrain/" + id, {
        method: "get",
      });
      type.value = response;
      loadingEdit.value = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  return { types, type, loading, getAll, create, update, getOne, trash, loadingEdit };
});

const useTerrainStore = defineStore("terrain", () => {
  const { $apiFetch } = useNuxtApp();
  let terrains = ref<Terrains>([]);
  let terrain = ref<Terrain>();
  let loading = ref(false);
  let loadingEdit = ref(false);

  const libres = computed<Terrains>(() =>
    terrains.value.filter((terrain) => terrain.status === statusBien.free)
  );

  const getAll = async () => {
    try {
      loading.value = true;
      terrains.value = await $apiFetch<Terrains>("api/terrains");
      loading.value = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: Terrain) => {
    const response = await $apiFetch<string>("api/terrains", {
      method: "post",
      body: payload,
    });
    await getAll();
    return response;
  };

  const update = async (payload: Terrain) => {
    const response = await $apiFetch<string>("api/terrains/" + payload.id, {
      method: "put",
      body: payload,
    });
    await getAll();
    return response;
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/terrains/" + id, {
      method: "delete",
    });
    await getAll();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loadingEdit.value = true;
      const response = await $apiFetch<Terrain>("api/terrains/" + id, {
        method: "get",
      });
      terrain.value = response;
      loadingEdit.value = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  return { terrain, terrains, libres, loading, getAll, create, update, getOne, trash, loadingEdit };
});

export { useTypeTerrainStore, useTerrainStore };
