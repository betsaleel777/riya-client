import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { TypePostForm, TypePutForm } from "~/types/global";
import { Depense, Depenses, TypeDepense, TypeDepenses } from "~/types/depense";


const useTypeDepenseStore = defineStore("type-depense", () => {
  const { $apiFetch } = useNuxtApp();

  let types = ref<TypeDepenses>([]);
  let type = ref<TypeDepense>({});
  let loading = reactive({ index: false, edit: false })

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

  let depenses = ref<Depenses>([]);
  let depense = ref<Depense>();
  let loading = reactive({ index: false, edit: false })


  const getAll = async () => {
    try {
      loading.index = true;
      depenses.value = await $apiFetch<Depenses>("api/depenses");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: Depense) => {
    const response = await $apiFetch<string>("api/depenses", { method: "post", body: payload });
    await getAll();
    return response;
  };

  const update = async (payload: Depense) => {
    const response = await $apiFetch<string>("api/depenses/" + payload.id, { method: "put", body: payload });
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
  return { depenses, depense, loading, getAll, create, update, getOne, trash };
});

export { useTypeDepenseStore, useDepenseStore };
