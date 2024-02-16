import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { TypePostForm, TypePutForm } from "~/types/global";
import { Depense, DepenseValidations, Depenses, TypeDepense, TypeDepenses } from "~/types/depense";
import { useDashboardStore } from "./dashboard";

const useTypeDepenseStore = defineStore("type-depense", () => {
  const { $apiFetch } = useNuxtApp();

  let types = ref<TypeDepenses>([]);
  let type = ref<TypeDepense>({});
  let loading = reactive({ index: false, edit: false });

  const getAll = async () => {
    try {
      loading.index = true;
      types.value = await $apiFetch<TypeDepenses>("api/typeDepense");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: TypePostForm) => {
    const response = await $apiFetch<string>("api/typeDepense", { method: "post", body: payload });
    await getAll();
    return response;
  };

  const update = async (payload: TypePutForm) => {
    const response = await $apiFetch<string>("api/typeDepense/" + payload.id, {
      method: "put",
      body: payload,
    });
    await getAll();
    return response;
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/typeDepense/" + id, { method: "delete" });
    await getAll();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      type.value = await $apiFetch<TypeDepense>("api/typeDepense/" + id, { method: "get" });
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  return { types, type, loading, getAll, create, update, getOne, trash };
});
const useDepenseStore = defineStore("depense", () => {
  const { $apiFetch } = useNuxtApp();
  const { getPendings } = useDashboardStore();

  let depenses = ref<Depenses>([]);
  let depense = ref<Depense>();
  let pending = ref<DepenseValidations>([]);
  let loading = reactive({ index: false, edit: false });

  const getAll = async () => {
    try {
      loading.index = true;
      depenses.value = await $apiFetch<Depenses>("api/depenses");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getPending = async () => {
    try {
      loading.index = true;
      pending.value = await $apiFetch<DepenseValidations>("api/depenses/pending");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: Depense) => {
    const response = await $apiFetch<string>("api/depenses", { method: "post", body: payload });
    await getAll();
    await getPendings();
    return response;
  };

  const update = async (payload: Depense) => {
    const response = await $apiFetch<string>("api/depenses/" + payload.id, {
      method: "put",
      body: payload,
    });
    await getAll();
    return response;
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/depenses/" + id, { method: "delete" });
    await getAll();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      depense.value = await $apiFetch<Depense>("api/depenses/" + id, { method: "get" });
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const validate = async (id: number, fromValidationPage: boolean) => {
    try {
      const response = await $apiFetch<string>("api/depenses/validate/" + id, { method: "PATCH" });
      fromValidationPage ? await getPending() : await getAll();
      await getPendings();
      return response;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };
  return {
    depenses,
    depense,
    loading,
    getAll,
    create,
    update,
    getOne,
    trash,
    validate,
    getPending,
    pending,
  };
});

export { useTypeDepenseStore, useDepenseStore };
