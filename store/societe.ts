import { defineStore } from "pinia";
import { FetchError } from "ofetch";
import { Count, Societe } from "~/types/societe";

export const useSocieteStore = defineStore("societe", () => {
  const { $apiFetch } = useNuxtApp();

  let societe = ref<Societe>({
    slogan: "",
    forme_juridique: "",
    boite_postale: "",
    contact: "",
    email: "",
    siege: "",
    registre: "",
    raison_sociale: "",
    description: "",
  });
  let loading = ref(false);
  let count = ref<Count>();

  const hydrateForm = (payload: Societe) => {
    const formData = new FormData();
    formData.append("slogan", payload.slogan ?? "");
    formData.append("forme_juridique", payload.forme_juridique ?? "");
    formData.append("boite_postale", payload.boite_postale ?? "");
    formData.append("contact", payload.contact ?? "");
    formData.append("email", payload.email ?? "");
    formData.append("siege", payload.siege ?? "");
    formData.append("registre", payload.registre ?? "");
    formData.append("raison_sociale", payload.raison_sociale ?? "");
    formData.append("description", payload.description ?? "");
    if (payload.image !== undefined) formData.append("image", payload.image, payload.image.name);
    return formData;
  };

  const getOne = async () => {
    try {
      loading.value = true;
      const response = await $apiFetch<Societe | string>("api/societes", { method: "get" });
      loading.value = false;
      if (typeof response !== "string") societe.value = response;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const create = async (payload: Societe) => {
    const formData = hydrateForm(payload);
    const response = await $apiFetch<string>("api/societes", {
      method: "post",
      body: formData,
    });
    await getOne();
    return response;
  };

  const update = async (payload: Societe) => {
    const formData = hydrateForm(payload);
    const response = await $apiFetch<string>("api/societes/" + payload.id + "?_method=PUT", {
      method: "post",
      body: formData,
    });
    await getOne();
    return response;
  };

  const getAction = (payload: Societe) => {
    return payload.id === undefined ? create : update;
  };

  const getCount = async () => {
    loading.value = true;
    const response = await $apiFetch<Count>("api/societe-count", { method: "get" });
    count.value = response;
    loading.value = false;
  };

  return { societe, loading, getAction, getOne, getCount, count };
});
