import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Achat, AchatValidations, Achats } from "~/types/achat";

export const useAchatStore = defineStore("achat", () => {
  const { $apiFetch } = useNuxtApp();

  let achats = ref<Achats>([]);
  let achat = ref<Achat>();
  let pendingValidations = ref<AchatValidations>([])
  let loading = reactive({ index: false, edit: false });

  const unsales = computed<Achats>(() => achats.value.filter((achat) => achat.reste > 0));

  const getAll = async () => {
    try {
      loading.index = true;
      achats.value = await $apiFetch<Achats>("api/achats");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getPending = async () => {
    try {
      loading.index = true;
      pendingValidations.value = await $apiFetch<AchatValidations>("api/achats/pending");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: Achat) => {
    const response = await $apiFetch<string>("api/achats", { method: "post", body: payload });
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
      const response = await $apiFetch<Achat>("api/achats/" + id, { method: "get" });
      achat.value = response;
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const valider = async (id: number) => {
    try {
      const response = await $apiFetch<string>('api/achats/validate/' + id, { method: "PATCH" })
      await getPending()
      return response
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  }

  return {
    achat,
    achats,
    unsales,
    loading,
    getAll,
    create,
    getOne,
    trash,
    getPending,
    pendingValidations,
    valider
  };
});
