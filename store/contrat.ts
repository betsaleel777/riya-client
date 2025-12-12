import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import type { Contrat, Contrats } from "~/types/contrat";
import { useDashboardStore } from "./dashboard";

export const useContratStore = defineStore("contrat", () => {
  const { $apiFetch } = useNuxtApp();
  const { getPendings } = useDashboardStore();

  let contrats = ref<Contrats>([]);
  let contrat = ref<Contrat>();
  let loading = reactive({ index: false, edit: false });

  const getAll = async () => {
    try {
      loading.index = true;
      contrats.value = await $apiFetch<Contrats>("api/contrats");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const update = async (payload: Contrat) => {
    const response = await $apiFetch<string>("api/contrats/" + payload.id, {
      method: "put",
      body: payload,
    });
    await getAll();
    return response;
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/contrats/" + id, { method: "delete" });
    await getAll();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      contrat.value = await $apiFetch<Contrat>("api/contrats/" + id, { method: "get" });
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getRentProcessing = async () => {
    try {
      loading.index = true;
      contrats.value = await $apiFetch<Contrats>("api/contrats/active-bail", { method: "get" });
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getRentAvanceProcessing = async () => {
    try {
      loading.index = true;
      contrats.value = await $apiFetch<Contrats>("api/contrats/active-avance-bail", {
        method: "get",
      });
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const validerContrat = async (payload: Contrat) => {
    const response = await $apiFetch<string>(`api/contrats/validate`, {
      method: "post",
      body: payload,
    });
    await getPendings();
    return response;
  };

  return {
    contrat,
    contrats,
    loading,
    getAll,
    update,
    getOne,
    trash,
    getRentProcessing,
    getRentAvanceProcessing,
    validerContrat,
  };
});
