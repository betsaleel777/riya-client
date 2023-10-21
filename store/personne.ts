import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { TypePostForm, TypePutForm } from "~/types/global";
import { Client, Clients, TypePersonne, TypePersonnes } from "~/types/personne";

const useTypePersonneStore = defineStore("type-personne", () => {
  const { $apiFetch } = useNuxtApp();

  let types = ref<TypePersonnes>([]);
  let type = ref<TypePersonne>({});
  let loading = reactive({ index: false, edit: false })

  const getAll = async () => {
    try {
      loading.index = true;
      types.value = await $apiFetch<TypePersonnes>("api/typeClient");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: TypePostForm) => {
    const response = await $apiFetch<string>("api/typeClient", { method: "post", body: payload });
    await getAll();
    return response;
  };

  const update = async (payload: TypePutForm) => {
    const response = await $apiFetch<string>("api/typeClient/" + payload.id, {
      method: "put",
      body: payload,
    });
    await getAll();
    return response;
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/typeClient/" + id, { method: "delete" });
    await getAll();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      type.value = await $apiFetch<TypePersonne>("api/typeClient/" + id, { method: "get" });
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  return { types, type, loading, getAll, create, update, getOne, trash };
});
const usePersonneStore = defineStore("personne", () => {
  const { $apiFetch } = useNuxtApp();

  let personnes = ref<Clients>([]);
  let client = ref<Client>();
  let loading = reactive({ index: false, edit: false })

  const nombre = computed(() => personnes.value.length);

  const hydrateForm = (payload: Client) => {
    const formData = new FormData();
    formData.append("nom_complet", payload.nom_complet ?? "");
    formData.append("email", payload.email ?? "");
    formData.append("telephone", payload.telephone ?? "");
    formData.append("cni", payload.cni ?? "");
    formData.append("date_naissance", payload.date_naissance ?? "");
    formData.append("lieu_naissance", payload.lieu_naissance ?? "");
    formData.append("nationalite", payload.nationalite ?? "");
    formData.append("ville", payload.ville ?? "");
    formData.append("quartier", payload.quartier ?? "");
    formData.append("pays", payload.pays ?? "");
    formData.append("animal", payload.animal ?? "");
    formData.append("fonctions", payload.fonctions ?? "");
    formData.append("civilite", payload.civilite ?? "");
    if (payload.type_client_id !== undefined)
      formData.append("type_client_id", String(payload.type_client_id));
    if (payload.image_piece !== undefined)
      formData.append("image_piece", payload.image_piece, payload.image_piece.name);
    if (payload.image_avatar !== undefined)
      formData.append("image_avatar", payload.image_avatar, payload.image_avatar.name);
    return formData;
  };

  const getAll = async () => {
    try {
      loading.index = true;
      personnes.value = await $apiFetch<Clients>("api/personnes");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: Client) => {
    const formData = hydrateForm(payload);
    const response = await $apiFetch<string>("api/personnes", { method: "post", body: formData });
    await getAll();
    return response;
  };

  const update = async (payload: Client) => {
    const formData = hydrateForm(payload);
    const response = await $apiFetch<string>("api/personnes/" + payload.id + "?_method=PUT", {
      method: "post",
      body: formData
    });
    await getAll();
    return response;
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/personnes/" + id, { method: "delete" });
    await getAll();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      client.value = await $apiFetch<Client>("api/personnes/" + id, { method: "get" });
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };
  return { personnes, client, loading, getAll, create, update, getOne, trash, nombre };
});

export { useTypePersonneStore, usePersonneStore };
