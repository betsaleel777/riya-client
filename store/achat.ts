import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Achat, Achats } from "~/types/achat";

export const useAchatStore = defineStore("achat", () => {
  const { $apiFetch } = useNuxtApp();

  let achats = ref<Achats>([]);
  let achat = ref<Achat>();
  let loading = reactive({ index: false, edit: false });

  const getAll = async () => {
    try {
      loading.index = true;
      achats.value = await $apiFetch<Achats>("api/achats");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: Achat) => {
    const response = await $apiFetch<string>("api/achats", {
      method: "post",
      body: payload,
    });
    await getAll();
    return response;
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/achats/" + id, {
      method: "delete",
    });
    await getAll();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      const response = await $apiFetch<Achat>("api/achats/" + id, {
        method: "get",
      });
      achat.value = response;
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  return {
    achat,
    achats,
    loading,
    getAll,
    create,
    getOne,
    trash,
  };
});
