import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Dashboard } from "~/types/dashboard";

export const useDashboardStore = defineStore("dashboard", () => {
  const { $apiFetch } = useNuxtApp();

  let dashboard = ref<Dashboard>();
  let loading = ref(true)

  const getAll = async () => {
    try {
      dashboard.value = await $apiFetch<Dashboard>("api/dashboard-count");
      loading.value = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };
  
  return { getAll, loading, dashboard };
});
