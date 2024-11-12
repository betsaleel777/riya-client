import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Dette, DetteValidations, Dettes } from "~/types/dette";
import { useDashboardStore } from "./dashboard";
import { DataPaginate, SearchData } from "~/types/global";

export const useDetteStore = defineStore("dette", () => {
  const { $apiFetch } = useNuxtApp();
  const { getPendings } = useDashboardStore();

  let dettes = ref<Dettes>([]);
  let dette = ref<Dette>();
  let liste = ref<DataPaginate>();
  let loading = reactive({ index: false, edit: false });
  let pendingValidation = ref<DetteValidations>([]);

  const getAll = async () => {
    try {
      loading.index = true;
      dettes.value = await $apiFetch<Dettes>("api/dettes");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getPaginate = async (page: number = 1): Promise<void> => {
    try {
      loading.index = true;
      liste.value = await $apiFetch<DataPaginate>("api/dettes/paginate", { params: { page } });
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getSearch = async (payload: SearchData): Promise<void> => {
    try {
      loading.index = true;
      liste.value = await $apiFetch<DataPaginate>("api/dettes/search", { params: payload });
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getPending = async () => {
    try {
      loading.index = true;
      pendingValidation.value = await $apiFetch<DetteValidations>("api/dettes/pending");
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
    const response = await $apiFetch<string>(`api/dettes/repay/${id}`, { method: "PATCH" });
    await getAll();
    await getPendings();
    return response;
  };

  const valider = async (id: number, fromValidationPage: boolean) => {
    const response = await $apiFetch<string>(`api/dettes/validate/${id}`, { method: "PATCH" });
    fromValidationPage ? await getPending() : await getAll();
    await getPendings();
    return response;
  };

  return {
    getAll,
    getOne,
    getPaginate,
    getSearch,
    loading,
    dettes,
    dette,
    liste,
    valider,
    repay,
    getPending,
    pendingValidation,
  };
});
