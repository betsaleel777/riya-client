import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Dashboard } from "~/types/dashboard";

export const useDashboardStore = defineStore("dashboard", () => {
  const { $apiFetch } = useNuxtApp();

  let dashboard = ref<Dashboard>();
  let loading = reactive({ dashboard: true, pendings: true });
  let pendings = ref<number>(0);

  const getAll = async () => {
    try {
      dashboard.value = await $apiFetch<Dashboard>("api/dashboard-count");
      loading.dashboard = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getPendings = async () => {
    try {
      pendings.value = await $apiFetch<number>("api/dashboard-pendings");
      loading.pendings = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  return { getAll, getPendings, loading, dashboard, pendings };
});
