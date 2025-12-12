import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import type { Paiement, Paiements } from "~/types/paiements";
import { useAchatStore } from "./achat";
import { useDashboardStore } from "./dashboard";

export const usePaiementStore = defineStore("paiement", () => {
  const { $apiFetch } = useNuxtApp();
  const { getOne: getAchat } = useAchatStore();
  const { getPendings } = useDashboardStore();
  let paiements = ref<Paiements>([]);
  let paiement = ref<Paiement>();
  let loading = reactive({ index: false, edit: false });
  const { getPaginate, getSearch, liste } = usePaginationMethods("api/paiements", $apiFetch, loading);

  const getAll = async () => {
    try {
      loading.index = true;
      paiements.value = await $apiFetch<Paiements>("api/paiements");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: Paiement) => {
    const response = await $apiFetch<string>("api/paiements", { method: "post", body: payload });
    await getAchat(payload.payable_id);
    await getPendings();
    return response;
  };

  const createDirect = async (payload: Paiement) => {
    const response = await $apiFetch<string>("api/paiements/direct", {
      method: "post",
      body: payload,
    });
    await getPaginate();
    await getPendings();
    return response;
  };

  const update = async (payload: Paiement) => {
    const response = await $apiFetch<string>("api/paiements/" + payload.id, {
      method: "put",
      body: payload,
    });
    await getAchat(payload.payable_id);
    return response;
  };

  const updateDirect = async (payload: Paiement) => {
    const response = await $apiFetch<string>("api/paiements/" + payload.id, {
      method: "put",
      body: payload,
    });
    await getPaginate();
    return response;
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/paiements/" + id, { method: "delete" });
    await getPaginate();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      paiement.value = await $apiFetch<Paiement>("api/paiements/" + id, { method: "get" });
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const valider = async (payload: Paiement) => {
    const response = await $apiFetch<string>(`api/paiements/validate/${payload.id}`, {
      method: "PATCH",
    });
    await getAchat(payload.payable_id);
    await getPendings();
    return response;
  };

  const validerPaiement = async (payload: Paiement) => {
    const response = await $apiFetch<string>(`api/paiements/validate/${payload.id}`, {
      method: "PATCH",
    });
    await getPaginate();
    await getPendings();
    return response;
  };

  const getByPayable = async (id: number) => {
    loading.edit = true;
    paiements.value = await $apiFetch<Paiements>("api/paiements/payable/" + id, { method: "get" });
    loading.edit = false;
  };

  return {
    paiement,
    paiements,
    loading,
    liste,
    getAll,
    create,
    createDirect,
    update,
    updateDirect,
    getOne,
    trash,
    valider,
    validerPaiement,
    getByPayable,
    getPaginate,
    getSearch,
  };
});
