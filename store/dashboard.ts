import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Dashboard } from "~/types/dashboard";

export const useDashboardStore = defineStore("dashboard", () => {
  const { $apiFetch } = useNuxtApp();

  let dashboard = ref<Dashboard>();
  let loading = reactive({
    dashboard: false,
    pendings: false,
    chiffre: false,
    depense: false,
    dette: false,
  });
  let pendings = ref<number>(0);

  const getAll = async () => {
    try {
      loading.dashboard = true;
      dashboard.value = await $apiFetch<Dashboard>("api/dashboard-count");
      loading.dashboard = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getChiffres = async (payload: { date: string | string[] }) => {
    const data = typeof payload.date === "string" ? payload.date : payload.date.join(",");
    loading.chiffre = true;
    dashboard.value
      ? (dashboard.value.chiffres = await $apiFetch<Dashboard["chiffres"]>(
          `api/dashboard-count/chiffres`,
          { method: "get", params: { date: data } }
        ))
      : null;
    loading.chiffre = false;
    return "Chiffre d'affaire mis à jour selon le critère de recherche" as string;
  };

  const getDettes = async (payload: { date: string | string[] }) => {
    const data = typeof payload.date === "string" ? payload.date : payload.date.join(",");
    loading.dette = true;
    dashboard.value
      ? (dashboard.value.remboursements = await $apiFetch<Dashboard["remboursements"]>(
          "api/dashboard-count/dettes",
          { method: "get", params: { date: data } }
        ))
      : null;
    loading.dette = false;
    return "Dettes mises à jour selon le critère de recherche" as string;
  };

  const getDepenses = async (payload: { date: string | string[] }) => {
    const data = typeof payload.date === "string" ? payload.date : payload.date.join(",");
    loading.depense = true;
    dashboard.value
      ? (dashboard.value.depenses = await $apiFetch<Dashboard["depenses"]>(
          "api/dashboard-count/depenses",
          { method: "get", params: { date: data } }
        ))
      : null;
    loading.depense = false;
    return "Dépenses mises à jour selon le critère de recherche" as string;
  };

  const getSwitch = (type: string) => {
    if (type === "depenses") return getDepenses;
    else if (type === "dettes") return getDettes;
    else return getChiffres;
  };

  const getPendings = async () => {
    try {
      loading.pendings = true;
      pendings.value = await $apiFetch<number>("api/dashboard-pendings");
      loading.pendings = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  return { getAll, getPendings, getSwitch, loading, dashboard, pendings };
});
