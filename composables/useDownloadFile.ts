import { FetchError } from "ofetch";
export const useDownloadFile = async (path: string) => {
  const { $apiFetch } = useNuxtApp();
  try {
    return await $apiFetch<Blob>(`api/media`, {
      method: "get",
      responseType: "blob",
      params: { path },
    });
  } catch (error) {
    if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
  }
};
