import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Utilisateur, Utilisateurs } from "~/types/utilisateur";

export const useUtilisateurStore = defineStore("utilisateur", () => {
  const { $apiFetch } = useNuxtApp();
  let utilisateur = ref<Utilisateur>();
  let utilisateurs = ref<Utilisateurs>([]);
  let loading = reactive({ index: false, edit: false });

  const hydrateForm = (payload: Utilisateur) => {
    const formData = new FormData();
    formData.append("name", payload.name ?? "");
    formData.append("email", payload.email ?? "");
    formData.append("password", payload.password ?? "");
    formData.append("password_confirmation", payload.password_confirmation ?? "");
    formData.append("oldPassword", payload.oldPassword ?? "");
    if (payload.image !== undefined) formData.append("image", payload.image, payload.image.name);
    return formData;
  };

  const getAll = async () => {
    try {
      loading.index = true;
      utilisateurs.value = await $apiFetch<Utilisateurs>("api/users");
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: Utilisateur) => {
    const formData = hydrateForm(payload);
    const response = await $apiFetch<string>("api/users", {
      method: "post",
      body: formData,
    });
    await getAll();
    return response;
  };

  const update = async (payload: Utilisateur) => {
    const formData = hydrateForm(payload);
    const response = await $apiFetch<string>("api/users/" + payload.id + "?_method=PUT", {
      method: "post",
      body: formData,
    });
    await getAll();
    return response;
  };

  const trash = async (id: number) => {
    const response = await $apiFetch<string>("api/users/" + id, { method: "delete" });
    await getAll();
    return response;
  };

  const getOne = async (id: number) => {
    try {
      loading.edit = true;
      const response = await $apiFetch<Utilisateur>("api/users/" + id, { method: "get" });
      utilisateur.value = response;
      loading.edit = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  return { getAll, getOne, create, update, trash, loading, utilisateurs, utilisateur };
});
