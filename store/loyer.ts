import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { AvanceLoyerForm, Loyer, LoyerValidations, Loyers } from "~/types/loyer";
import { statusPayable } from "~/utils/constante";
import { useDashboardStore } from "./dashboard";

export const useLoyerStore = defineStore("loyer", () => {
  const { $apiFetch } = useNuxtApp();
  const { getPendings } = useDashboardStore();
  let loyers = ref<Loyers>([]);
  let loyer = ref<Loyer | null>();
  let pendingValidations = ref<LoyerValidations>([]);
  let loading = reactive({ index: false, edit: false });
  const { getPaginate, getSearch, liste } = usePaginationMethods("api/loyers", $apiFetch, loading);

  const impayes = computed<Loyers>(() =>
    loyers.value.filter((loyer) => loyer.status === statusPayable.unpaid)
  );

  const getAll = async () => {
    try {
      loading.index = true;
      loyers.value = await $apiFetch<Loyers>("api/loyers");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getPending = async () => {
    try {
      loading.index = true;
      pendingValidations.value = await $apiFetch<LoyerValidations>("api/loyers/pending");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getLastPaid = async (id: number) => {
    try {
      loading.edit = true;
      loyer.value = await $apiFetch<Loyer | null>("api/loyers/last-paid", {
        method: "get",
        params: { id },
      });
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/loyers/" + id, { method: "delete" });
    await getPaginate();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      loyer.value = await $apiFetch<Loyer>("api/loyers/" + id, { method: "get" });
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const cashed = async (payload: { id: number; montant: number }) => {
    const { id, montant } = payload;
    const response = await $apiFetch<string>("api/loyers/cashed", {
      method: "PATCH",
      params: { id, montant },
    });
    await getPaginate();
    await getPendings();
    return response;
  };

  const valider = async (id: number, fromValidationPage: boolean) => {
    const response = await $apiFetch<string>(`api/loyers/validate/${id}`, { method: "PATCH" });
    fromValidationPage ? await getPending() : await getPaginate();
    await getPendings();
    return response;
  };

  const avancer = async (avance: AvanceLoyerForm) => {
    const response = await $apiFetch<string>("api/loyers/avance", { method: "post", body: avance });
    await getPaginate();
    await getPendings();
    return response;
  };

  return {
    liste,
    loyers,
    loyer,
    impayes,
    loading,
    getAll,
    getOne,
    trash,
    cashed,
    valider,
    getPending,
    avancer,
    getLastPaid,
    getPaginate,
    getSearch,
    pendingValidations,
  };
});
