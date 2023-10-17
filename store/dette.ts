import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Dette, Dettes } from "~/types/dette";

export const useDetteStore = defineStore("dette", () => {
  const { $apiFetch } = useNuxtApp();

  let dettes = ref<Dettes>([]);
  let dette = ref<Dette>();
  let loading = reactive({ index: false, edit: false });

  const getAll = async () => {
    try {
      loading.index = true;
      dettes.value = await $apiFetch<Dettes>("api/dettes");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      dette.value = await $apiFetch<Dette>("api/dettes/" + id, { method: "get" });
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const repay = async (id: number) => {
    const response = await $apiFetch<string>(`api/dettes/repay/${ id }`, { method: "PATCH" });
    await getAll();
    return response;
  };

  const valider = async (id: number) => {
    const response = await $apiFetch<string>(`api/dettes/validate/${ id }`, { method: "PATCH" });
    await getAll();
    return response;
  };

  return { getAll, getOne, loading, dettes, valider, repay };
});
