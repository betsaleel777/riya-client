import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Operation, Visite, Visites } from "~/types/visite";

export const useVisiteStore = defineStore("visite", () => {
  const { $apiFetch } = useNuxtApp();

  let visites = ref<Visites>([]);
  let visite = ref<Visite>();
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

  const create = async (payload: Visite) => {
    const response = await $apiFetch<string>("api/visites", {
      method: "post",
      body: payload,
    });
    await getAll();
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
    const response = await $apiFetch<string>("api/visites/" + id, {
      method: "delete",
    });
    await getAll();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      const response = await $apiFetch<Visite>("api/visites/" + id, {
        method: "get",
      });
      visite.value = response;
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const validerDirectement = async (id: number) => {
    const response = await $apiFetch<string>(`api/visites/direct-validate/${ id }`, { method: "PATCH" });
    await getAll();
    return response;
  };

  const fraisPatch = async (payload: { id: number, frais_dossier: number }) => {
    const response = await $apiFetch<string>(`api/visites/frais-dossier/${ payload.id }`, {
      method: "PATCH",
      body: payload
    });
    await getOne(payload.id);
    return response;
  };

  const createOperation = async (payload: Operation) => {
    const response = await $apiFetch<string>(`api/${ payload.type }`, {
      method: "post",
      body: payload,
    });
    await getOne(payload.visite_id);
    await getAll()
    return response;
  };

  const updateOperation = async (payload: Operation) => {
    const response = await $apiFetch<string>(`api/${ payload.type }/${ payload.id }`, {
      method: "put",
      body: payload,
    });
    await getOne(payload.visite_id);
    await getAll()
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
    fraisPatch
  };
});
