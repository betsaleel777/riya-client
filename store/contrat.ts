import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Contrat, Contrats } from "~/types/contrat";
import { useVisiteStore } from "./visite";
import { useAchatStore } from "./achat";

export const useContratStore = defineStore("contrat", () => {
  const { $apiFetch } = useNuxtApp();
  const { getAll: getVisites, getOne: getVisite } = useVisiteStore();
  const { getOne: getAchat } = useAchatStore();

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
    try {
      const response = await $apiFetch<string>("api/contrats/" + payload.id, {
        method: "put",
        body: payload,
      });
      await getAll();
      return response;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const trash = async (id: number) => {
    try {
      const response = await $apiFetch<string>("api/contrats/" + id, { method: "delete" });
      await getAll();
      return response;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      const response = await $apiFetch<Contrat>("api/contrats/" + id, {
        method: "get",
      });
      contrat.value = response;
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const validerContrat = async (payload: Contrat) => {
    const response = await $apiFetch<string>(`api/contrats/validate`, {
      method: "post",
      body: payload,
    });
    if (typeContrat.visite === payload.operation_type) {
      await getVisites();
      await getVisite(payload.operation_id);
    } else {
      await getAchat(payload.operation_id);
    }
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
    validerContrat,
  };
});
