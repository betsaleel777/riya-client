import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Loyer, LoyerValidations, Loyers } from "~/types/loyer";
import { statusPayable } from "~/utils/constante";

export const useLoyerStore = defineStore("loyer", () => {
  const { $apiFetch } = useNuxtApp();

  let loyers = ref<Loyers>([]);
  let loyer = ref<Loyer>();
  let pendingValidations = ref<LoyerValidations>([])
  let loading = reactive({ index: false, edit: false });

  const impayes = computed<Loyers>(() => loyers.value.filter((loyer) => loyer.status === statusPayable.unpaid));

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

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/loyers/" + id, { method: "delete" });
    await getAll();
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

  const cashed = async (id: number) => {
    const response = await $apiFetch<string>(`api/loyers/cashed/${ id }`, { method: "PATCH" });
    await getAll();
    return response;
  };

  const valider = async (id: number, fromValidationPage: boolean) => {
    const response = await $apiFetch<string>(`api/loyers/validate/${ id }`, { method: "PATCH" });
    fromValidationPage ? await getPending() : await getAll();
    return response;
  };

  return { loyers, loyer, impayes, loading, getAll, getOne, trash, cashed, valider, getPending, pendingValidations };
});
