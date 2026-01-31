import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import type { Dette, DetteValidations, Dettes, Stat } from "~/types/dette";
import { useDashboardStore } from "./dashboard";

export const useDetteStore = defineStore("dette", () => {
  const { $apiFetch } = useNuxtApp();
  const { getPendings } = useDashboardStore();

  let dettes = ref<Dettes>([]);
  let dette = ref<Dette>();
  let stats = ref<Stat | null>(null);
  let loading = reactive({ index: false, edit: false, stats: false });
  let pendingValidation = ref<DetteValidations>([]);
  const { getPaginate, getSearch, liste } = usePaginationMethods("api/dettes", $apiFetch, loading);

  const getAll = async () => {
    try {
      loading.index = true;
      dettes.value = await $apiFetch<Dettes>("api/dettes");
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
    await getPaginate();
    await getPendings();
    await fetchStats();
    return response;
  };

  const fetchStats = async () => {
    try {
      loading.stats = true;
      stats.value = await $apiFetch<Stat>("api/dettes/stats", { method: "get" });
      loading.stats = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const valider = async (id: number, fromValidationPage: boolean) => {
    const response = await $apiFetch<string>(`api/dettes/validate/${id}`, { method: "PATCH" });
    if (fromValidationPage) {
      await getPending();
    } else {
      await getPaginate();
      await fetchStats();
    }
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
    fetchStats,
    stats,
    pendingValidation,
  };
});
