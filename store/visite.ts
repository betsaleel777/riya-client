import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import type { Operation, Visite, VisiteValidations, Visites } from "~/types/visite";
import { useDashboardStore } from "./dashboard";

export const useVisiteStore = defineStore("visite", () => {
  const { $apiFetch } = useNuxtApp();
  const { getPendings } = useDashboardStore();

  let visites = ref<Visites>([]);
  let visite = ref<Visite>();
  let pending = ref<VisiteValidations>([]);
  let loading = reactive({ index: false, edit: false });

  const getAll = async () => {
    try {
      loading.index = true;
      visites.value = await $apiFetch<Visites>("api/visites");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getPending = async () => {
    try {
      loading.index = true;
      pending.value = await $apiFetch<VisiteValidations>("api/visites/pending");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: Visite) => {
    const response = await $apiFetch<string>("api/visites", { method: "post", body: payload });
    await getAll();
    await getPendings();
    return response;
  };

  const update = async (payload: Visite) => {
    const response = await $apiFetch<string>("api/visites/" + payload.id, {
      method: "put",
      body: payload,
    });
    await getAll();
    return response;
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/visites/" + id, { method: "delete" });
    await getAll();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      visite.value = await $apiFetch<Visite>("api/visites/" + id, { method: "get" });
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const validerDirectement = async (id: number, fromValidationPage: boolean) => {
    const response = await $apiFetch<string>(`api/visites/direct-validate/${id}`, {
      method: "PATCH",
    });
    fromValidationPage ? await getPending() : await getAll();
    await getPendings();
    return response;
  };

  const fraisPatch = async (payload: { id: number; frais_dossier: number }) => {
    const response = await $apiFetch<string>(`api/visites/frais-dossier/${payload.id}`, {
      method: "PATCH",
      body: payload,
    });
    await getOne(payload.id);
    return response;
  };

  const createOperation = async (payload: Operation) => {
    const response = await $apiFetch<string>(`api/${payload.type}`, {
      method: "post",
      body: payload,
    });
    await getOne(payload.visite_id);
    await getAll();
    return response;
  };

  const updateOperation = async (payload: Operation) => {
    const response = await $apiFetch<string>(`api/${payload.type}/${payload.id}`, {
      method: "put",
      body: payload,
    });
    await getOne(payload.visite_id);
    await getAll();
    return response;
  };

  const getOperationAction = (payload: Operation | undefined) => {
    return payload?.id === undefined || payload === null ? createOperation : updateOperation;
  };

  return {
    visite,
    visites,
    loading,
    getAll,
    create,
    update,
    getOne,
    trash,
    validerDirectement,
    getOperationAction,
    fraisPatch,
    getPending,
    pending,
  };
});
