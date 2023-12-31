import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Paiement, Paiements } from "~/types/paiements";
import { useAchatStore } from "./achat";

export const usePaiementStore = defineStore("paiement", () => {
  const { $apiFetch } = useNuxtApp();
  const { getOne: getAchat } = useAchatStore();

  let paiements = ref<Paiements>([]);
  let paiement = ref<Paiement>();
  let loading = reactive({ index: false, edit: false });

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
    return response;
  };

  const createDirect = async (payload: Paiement) => {
    const response = await $apiFetch<string>("api/paiements/direct", { method: "post", body: payload });
    await getAll();
    return response;
  };

  const update = async (payload: Paiement) => {
    const response = await $apiFetch<string>("api/paiements/" + payload.id, { method: "put", body: payload });
    await getAchat(payload.payable_id);
    return response;
  };

  const updateDirect = async (payload: Paiement) => {
    const response = await $apiFetch<string>("api/paiements/" + payload.id, { method: "put", body: payload });
    await getAll();
    return response;
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/paiements/" + id, { method: "delete" });
    await getAll();
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
    const response = await $apiFetch<string>(`api/paiements/validate/${ payload.id }`, { method: "PATCH" });
    await getAchat(payload.payable_id);
    return response;
  };

  const validerPaiement = async (payload: Paiement) => {
    const response = await $apiFetch<string>(`api/paiements/validate/${ payload.id }`, { method: "PATCH" });
    await getAll();
    return response;
  };

  const getByAchat = async (id: number) => {
    loading.index = true;
    paiements.value = await $apiFetch<Paiements>("api/paiements/achat/" + id);
    loading.index = false;
  };

  return {
    paiement,
    paiements,
    loading,
    getAll,
    create,
    createDirect,
    update,
    updateDirect,
    getOne,
    trash,
    getByAchat,
    valider,
    validerPaiement,
  };
});
