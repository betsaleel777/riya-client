import type { DataPaginate, SearchData } from "~/types/global";
import type { FetchRequest, FetchOptions } from "ofetch";
import { FetchError } from "ofetch";
type PaginateFunction = (id?: number) => Promise<void>;
type SearchFunction = (data: SearchData) => Promise<void>;
type ApiFetch = <T>(endpoint: FetchRequest, options?: FetchOptions) => Promise<T>;

export type ServerPaginationFilterParams = { range?: [string, string] | null; status?: string | null };

const useServerPagination = (
  liste: Ref<DataPaginate | undefined>,
  getPaginate: PaginateFunction,
  getSearch: SearchFunction,
  options?: { filterParams?: Ref<ServerPaginationFilterParams> }
) => {
  const toSearch = ref("");
  const loadedSearch = ref(false);
  const filterParams = options?.filterParams;
  const searchExists = computed(
    () =>
      toSearch.value !== "" && toSearch.value.trim().length !== 0 ||
      (filterParams?.value && (filterParams.value.range != null || filterParams.value.status != null))
  );
  const buildSearchPayload = (page: number): Parameters<SearchFunction>[0] => {
    const range = filterParams?.value?.range;
    return {
      search: toSearch.value || undefined,
      page,
      ...(range?.[0] && { date_from: range[0] }),
      ...(range?.[1] && { date_to: range[1] }),
      ...(filterParams?.value?.status && { status: filterParams.value.status }),
    };
  };
  const setPage = async (val: number) => {
    if (searchExists.value) {
      await getSearch(buildSearchPayload(val));
    } else {
      await getPaginate(val);
    }
  };
  const total = computed(() => liste.value?.meta?.total);
  const pageSize = computed(() => liste.value?.meta.per_page);
  const currentPage = computed(() => liste.value?.meta.current_page);
  const search = async () => {
    await getSearch(buildSearchPayload(1));
    loadedSearch.value = true;
  };
  const setRefresh = async () => {
    toSearch.value = "";
    if (filterParams?.value) {
      filterParams.value.range = null;
      filterParams.value.status = null;
    }
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
