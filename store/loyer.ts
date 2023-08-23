import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Loyer, Loyers } from "~/types/Loyer";
import { statusLoyer } from "~/utils/constante";

export const useLoyerStore = defineStore("loyer", () => {
  const { $apiFetch } = useNuxtApp();

  let loyers = ref<Loyers>([]);
  let loyer = ref<Loyer>();
  let loading = reactive({ index: false, edit: false });

  const impayes = computed<Loyers>(() =>
    loyers.value.filter((loyer) => loyer.status === statusLoyer.unpaid)
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

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/loyers/" + id, {
      method: "delete",
    });
    await getAll();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      const response = await $apiFetch<Loyer>("api/loyers/" + id, {
        method: "get",
      });
      loyer.value = response;
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const cashed = async (id: number) => {
    try {
      const response = await $apiFetch<string>(`api/loyers/cashed/${id}`, {
        method: "PATCH",
      });
      await getAll();
      return response;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const valider = async (id: number) => {
    try {
      const response = await $apiFetch<string>(`api/loyers/validate/${id}`, {
        method: "PATCH",
      });
      await getAll();
      return response;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  return { loyers, loyer, impayes, loading, getAll, getOne, trash, cashed, valider };
});
