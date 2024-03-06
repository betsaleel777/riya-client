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

  const getChiffres = async (date: string | string[]) => {
    try {
      loading.chiffre = true;
      dashboard.value
        ? (dashboard.value.chiffres = await $apiFetch<Dashboard["chiffres"]>(
            "api/dashboard-count/chiffres",
            { method: "get", params: { date } }
          ))
        : null;
      loading.chiffre = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getDettes = async (date: string | string[]) => {
    try {
      loading.dette = true;
      dashboard.value
        ? (dashboard.value.remboursements = await $apiFetch<Dashboard["remboursements"]>(
            "api/dashboard-count/dettes",
            { method: "get", params: { date } }
          ))
        : null;
      loading.dette = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getDepenses = async (date: string | string[]) => {
    try {
      loading.depense = true;
      dashboard.value
        ? (dashboard.value.depenses = await $apiFetch<Dashboard["depenses"]>(
            "api/dashboard-count/depenses",
            { method: "get", params: { date } }
          ))
        : null;
      loading.depense = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getSwitch = (payload: { date: string | string[]; type: string }) => {
    if (payload.type === "depenses") getDepenses(payload.date);
    else if (payload.type === "dettes") getDettes(payload.date);
    else getChiffres(payload.date);
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
