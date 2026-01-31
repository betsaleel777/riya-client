import type { DataPaginate, SearchData } from "~/types/global";
import type { FetchRequest, FetchOptions } from "ofetch";
import { FetchError } from "ofetch";
type PaginateFunction = (id?: number) => Promise<void>;
type SearchFunction = (data: SearchData) => Promise<void>;
type ApiFetch = <T>(endpoint: FetchRequest, options?: FetchOptions) => Promise<T>;

const useServerPagination = (
  liste: Ref<DataPaginate | undefined>,
  getPaginate: PaginateFunction,
  getSearch: SearchFunction
) => {
  const toSearch = ref("");
  const loadedSearch = ref(false);
  const searchExists = computed(() => toSearch.value !== "" && toSearch.value.trim().length !== 0);
  const setPage = async (val: number) => {
    searchExists.value
      ? await getSearch({ search: toSearch.value, page: val })
      : await getPaginate(val);
  };
  const total = computed(() => liste.value?.meta?.total);
  const pageSize = computed(() => liste.value?.meta.per_page);
  const currentPage = computed(() => liste.value?.meta.current_page);
  const search = async () => {
    if (searchExists) {
      await getSearch({ search: toSearch.value, page: 1 });
      loadedSearch.value = true;
    }
  };
  const setRefresh = async () => {
    toSearch.value = "";
    await getPaginate();
    loadedSearch.value = false;
  };
  return {
    setPage,
    setRefresh,
    search,
    total,
    pageSize,
    currentPage,
    toSearch,
    searchExists,
    loadedSearch,
  };
};
const usePaginationMethods = (path: string, fetch: ApiFetch, loading: any) => {
  let liste = ref<DataPaginate>();
  const getPaginate = async (page: number = 1): Promise<void> => {
    try {
      loading.index = true;
      liste.value = await fetch<DataPaginate>(path + "/paginate", { params: { page } });
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };

  const getSearch = async (payload: SearchData): Promise<void> => {
    try {
      loading.index = true;
      liste.value = await fetch<DataPaginate>(path + "/search", { params: payload });
      loading.index = false;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo("/login");
    }
  };
  return { liste, getSearch, getPaginate };
};

export { useServerPagination, usePaginationMethods };
