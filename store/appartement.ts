import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Appartement, Appartements, TypeAppartement, TypeAppartements } from "~/types/appartement";
import { TypePostForm, TypePutForm } from "~/types/global";

const useTypeAppartementStore = defineStore("type-appartement", () => {
  const { $apiFetch } = useNuxtApp();

  let types = ref<TypeAppartements>([]);
  let type = ref<TypeAppartement>();
  let loading = ref(false);
  let loadingEdit = ref(false);

  const getAll = async () => {
    try {
      loading.value = true;
      types.value = await $apiFetch<TypeAppartements>("api/appartements-types");
      loading.value = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: TypePostForm) => {
    const response = await $apiFetch<string>("api/appartements-types", {
      method: "post",
      body: payload,
    });
    await getAll();
    return response;
  };

  const update = async (payload: TypePutForm) => {
    const response = await $apiFetch<string>("api/appartements-types/" + payload.id, {
      method: "put",
      body: payload,
    });
    await getAll();
    return response;
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/appartements-types/" + id, {
      method: "delete",
    });
    await getAll();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loadingEdit.value = true;
      const response = await $apiFetch<TypeAppartement>("api/appartements-types/" + id, {
        method: "get",
      });
      type.value = response;
      loadingEdit.value = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  return { types, type, loading, getAll, create, update, getOne, trash, loadingEdit };
});

const useAppartementStore = defineStore("appartement", () => {
  const { $apiFetch } = useNuxtApp();

  let appartements = ref<Appartements>([]);
  let appartement = ref<Appartement>();
  let loading = ref(false);
  let loadingEdit = ref(false);

  const libres = computed<Appartements>(() =>
    appartements.value.filter((appartement) => appartement.status === statusBien.free)
  );

  const getAll = async () => {
    try {
      loading.value = true;
      appartements.value = await $apiFetch<Appartements>("api/appartements");
      loading.value = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: Appartement) => {
    const response = await $apiFetch<string>("api/appartements", {
      method: "post",
      body: payload,
    });
    await getAll();
    return response;
  };

  const update = async (payload: Appartement) => {
    const response = await $apiFetch<string>("api/appartements/" + payload.id, {
      method: "put",
      body: payload,
    });
    await getAll();
    return response;
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/appartements/" + id, {
      method: "delete",
    });
    await getAll();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loadingEdit.value = true;
      const response = await $apiFetch<Appartement>("api/appartements/" + id, {
        method: "get",
      });
      appartement.value = response;
      loadingEdit.value = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  return {
    appartements,
    appartement,
    libres,
    loading,
    getAll,
    create,
    update,
    getOne,
    trash,
    loadingEdit,
  };
});

export { useTypeAppartementStore, useAppartementStore };
